#!/usr/bin/env python3
"""Separate publication success, pending source work, and deduplicated notifications."""
import argparse
import json
from datetime import datetime, timezone
from pathlib import Path
from arxiv_client import atomic_json
from progressive_publish import ROOT, digest, request_json


def notification(previous, status, missing):
    key = digest(missing)
    if status in ('failed', 'blocked'):
        return True, key
    if status == 'published_partial':
        return not previous or previous.get('status') != status or previous.get('missingKey') != key, key
    return bool(previous and previous.get('status') == 'published_partial'), key


def verify(feed, manifest, outbox):
    if manifest.get('schemaVersion') != 2 or manifest.get('entries') != feed.get('entries') or manifest.get('coverage') != feed.get('coverage') or manifest.get('contentHash') != feed.get('contentHash'):
        raise RuntimeError('Sites content does not match the verified local snapshot')
    if not outbox or outbox.get('status') != 'verified' or outbox.get('contentHash') != feed.get('contentHash'):
        raise RuntimeError('Mirror has not been verified for this publication')


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--run',required=True);args=parser.parse_args()
    path=Path(args.run);progress=json.loads((path/'progress.json').read_text());day=progress['scheduledFor'][:10]
    receipt={'schemaVersion':2,**progress,'scheduledDate':day,'completedAt':datetime.now(timezone.utc).isoformat(),'status':'failed','sitesVerified':False,'pagesVerified':False,'ingestVerified':False}
    notices=ROOT/'.automation/progress/notifications.json';previous=json.loads(notices.read_text()) if notices.exists() else {}
    try:
        outbox=json.loads((ROOT/'.automation/progress/mirror-outbox.json').read_text())['days']
        results=[]
        for date in progress['publishedDays']:
            local=json.loads((path/('publications-'+date)/'published.json').read_text())
            feed=request_json('/api/reports/v2?date='+date);verify(feed,local,outbox.get(date));results.append(feed)
        if not results:raise RuntimeError('No publication verified')
        latest=max(results,key=lambda f:f['date']);complete=all(f['coverage']['complete'] for f in results)
        receipt.update(status='success' if complete else 'published_partial',announcementDate=latest['date'],expectedCount=latest['coverage']['expectedCount'],publishedCount=latest['coverage']['publishedCount'],coverage=latest['coverage'],sitesVerified=True,pagesVerified=True,ingestVerified=True,officialVerified=latest['coverage']['listingsComplete'])
        missing={f['date']:{'categories':[c for c in ['mathDg','mathMg','mathGt'] if not any(s['category']==c and s['complete'] for s in f['categories'])],'metadata':[e['arxivId'] for e in f['entries'] if not all(e['metadata'].get(k) for k in ['title','authors','abstract','categories','primaryCategory','version','submittedAt','updatedAt'])],'analysis':[e['arxivId'] for e in f['entries'] if not e['analysis']]} for f in results}
    except Exception as error:
        receipt['errorSummary']=str(error);missing={'error':str(error)}
    notify,key=notification(previous.get(day),receipt['status'],missing);receipt['notify']=notify;receipt['pending']=missing
    previous[day]={'status':receipt['status'],'missingKey':key};atomic_json(notices,previous)
    atomic_json(ROOT/'.automation/daily-outcomes'/f'{day}.json',receipt);atomic_json(ROOT/'.automation/daily-outcomes/history'/(receipt['runId']+'.json'),receipt)
    print(json.dumps({k:receipt.get(k) for k in ['runId','status','announcementDate','expectedCount','publishedCount','notify','errorSummary']}))
    if receipt['status']=='failed':raise SystemExit(1)


if __name__=='__main__':main()
