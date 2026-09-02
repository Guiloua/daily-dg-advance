#!/usr/bin/env python3
"""Build the first curated report batch from an arXiv metadata snapshot."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

ANALYSES = {
    '2609.01464': ('度量测度几何、极限与奇异空间', '新定理/分类', '建立 Einstein 度量与 Ricci 下界度量的可去奇点定理，并把带高余维奇集的有界度量规范地延拓为 RCD 空间。', ['RCD 理论', '可去奇点分析', '正则集结构'], '把低正则奇异度量、Einstein 光滑延拓与非塌缩 RCD 正则结构放入同一框架，并给出 Schoen 标量曲率奇点猜想的一类推论。', '余维阈值与有界性假设仍然关键；摘要层面未展示全部局部估计。', 94),
    '2609.01540': ('曲率与比较几何', '推广/加强', '把 Riemannian 正质量定理的 Dong–Song 稳定性推广到任意高维渐近平坦自旋流形。', ['自旋子方法', '全局极小图坐标', '测度 Gromov–Hausdorff 收敛'], '在 ADM 质量趋零时，经切除边界面积趋零的区域后得到到欧氏空间的 pointed measured GH 收敛，提供了高维定量刚性路径。', '依赖自旋与非负标量曲率，并允许切除小边界区域。', 92),
    '2609.01463': ('曲率与比较几何', '新定理/分类', '研究 Heisenberg–Pauli–Weyl 不等式亏量如何控制流形到欧氏或双曲模型空间的 Gromov–Hausdorff 距离。', ['比较几何', '亏量稳定性', 'pointed Gromov–Hausdorff 收敛'], '同时覆盖负截面曲率与非负 Ricci 曲率情形，并提出曲率修正的不等式与定量刚性估计。', '非负 Ricci 情形存在由矩控制的尺度因子；完整常数和最优性需查正文。', 90),
    '2609.00840': ('几何分析、几何 PDE 与几何流', '新定理/分类', '证明任意偶数维的完备 almost-Kähler 梯度收缩 Ricci 孤立子必为 Kähler。', ['Ricci 孤立子方程', 'almost-Kähler 恒等式', '完备性分析'], '去除了紧致性限制，并由此完成四维完备 almost-Kähler 收缩子的分类。', '分类推论依赖已有 Kähler–Ricci shrinker 曲面分类；摘要未说明增长控制细节。', 89),
    '2609.01442': ('几何分析、几何 PDE 与几何流', '新定理/分类', '证明 ruled surfaces 上任意有限时塌缩 Kähler–Ricci 流都形成 Type I 奇点。', ['Kähler–Ricci 流', '奇点吹起分析', '纤维塌缩估计'], '识别标准乘积 shrinker 为奇点模型，并推出纤维的最优塌缩速率。', '结论限定于 ruled surfaces 与塌缩型有限时奇点。', 87),
    '2609.01324': ('几何分析、几何 PDE 与几何流', '推广/加强', '对受几何限制的面积极小整流流建立与余维无关的质量上界。', ['Colding–Minicozzi 体积倍增', 'current-theoretic squashing', '局部化估计'], '肯定回答 Lin 的内部质量上界问题，并在双曲应用中移除双指数局部质量增长假设。', '需要几何 confinement 与代数投影重数控制；边界应用的完整条件需查正文。', 86),
    '2609.01565': ('几何分析、几何 PDE 与几何流', '新方法/构造', '构造双曲空间中具有给定无穷远渐近边界、常高阶平均曲率的光滑完备超曲面。', ['半凸化约化', '曲率方程', '凹性不等式'], '新约化把通常凹性失效的次临界指标大范围带回可处理的半凸情形。', '摘要未给出可容许边界数据与指标范围的精确端点。', 85),
    '2609.01284': ('度量测度几何、极限与奇异空间', '新方法/构造', '为 Lebesgue 通用覆盖常数建立精确的 Reuleaux 型有限弧变分层级。', ['有限维变分逼近', '区间证书', 'Reuleaux 几何'], '证明层级以二阶速率收敛，并把认证下界提高到 0.834。', '主要是平面凸几何常数问题，与课题组 Ricci 极限主线的联系较间接。', 78),
    '2609.01460': ('度量测度几何、极限与奇异空间', '推广/加强', '在由连续成本耦合的 Polish 测度空间上建立 cost-Santaló 不等式框架。', ['传递原理', '对数凹等周函数', '最优输运'], '框架统一并推广多个函数型 Santaló 不等式，包含 RCD(K,∞)、矩阵空间与输运熵应用。', '范围很广，几何结论依赖抽象成本结构；与核心比较几何问题的直接性中等。', 77),
    '2609.00501': ('几何分析、几何 PDE 与几何流', '推广/加强', '在定量非脐条件下证明 Möbius 不变 Willmore 流有限时几何端点的唯一性。', ['内蕴输运估计', 'Allard 紧性与可整流性', 'varifold 收敛'], '把子列收敛提升为整条轨道的唯一 varifold 极限，并给出面积测度的定量收敛。', '核心结论依赖统一非脐性；无该条件的端点选择问题仍未解决。', 82),
    '2609.00183': ('度量测度几何、极限与奇异空间', '推广/加强', '证明到 NPC DM-complex 的调和映射各阶奇异层都是可数可整流的。', ['定量分层', '调和映射正则性', 'NPC 复形几何'], '从 F-connected complexes 推广到 DM-complexes，并逐层给出 k-可整流性。', '工作主要沿用既有框架，突破更偏适用范围扩展。', 76),
    '2609.00556': ('黎曼、亚黎曼、Finsler及特殊几何结构', '新定理/分类', '给出紧 Riemann 曲面上 Higgs bundle 的 H-ampleness 与 Higgs–Demailly 系统终端光滑解之间的等价刻画。', ['先验估计', 'Leray–Schauder 度理论', 'Higgs 商层反证'], '补出标量下界并用正 Griffiths 型 Hitchin–Simpson 曲率提供独立解析刻画。', '目前基底限于紧 Riemann 曲面，向高维推广仍不明确。', 74),
    '2609.00186': ('曲率与比较几何', '新定理/分类', '在二维证明广义 Geroch 猜想及其双曲对应命题。', ['宏观标量曲率', '二维曲面论', 'AI 生成证明的人工呈现'], '以极短摘要宣称解决两个二维宏观标量曲率猜想，并明确披露证明由 AI 生成。', '摘要没有给出假设、技术路线或验证细节，必须回查全文并独立核验证明。', 80),
}


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('source')
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    source = json.loads(Path(args.source).read_text(encoding='utf-8'))
    papers = {paper['arxivId']: paper for paper in source['papers']}
    now = datetime.now(timezone.utc).isoformat()
    reports = []
    for arxiv_id, (topic, progress, work, techniques, breakthrough, limitations, score) in ANALYSES.items():
        paper = papers[arxiv_id]
        tier = 'high' if score >= 75 else 'medium' if score >= 50 else 'low'
        explicit = arxiv_id == '2609.00186'
        reports.append({
            'announcementDate': source['announcementDate'], 'arxivId': arxiv_id, 'version': paper['version'], 'entryKind': 'new',
            'title': paper['title'], 'authors': paper['authors'], 'abstract': paper['abstract'], 'categories': paper['categories'], 'primaryCategory': paper['primaryCategory'],
            'arxivUrl': paper['arxivUrl'], 'pdfUrl': paper['pdfUrl'], 'submittedAt': paper['submittedAt'], 'updatedAt': paper['updatedAt'],
            'topic': topic, 'progressType': progress, 'workSummary': work, 'techniques': techniques, 'breakthrough': breakthrough, 'limitations': limitations,
            'analysisDepth': 'abstract', 'aiStatus': 'explicit' if explicit else 'no_disclosure_observed',
            'aiEvidence': '作者评论明确写明“Presentation of AI generated proof”。' if explicit else None,
            'aiEvidenceSource': 'arXiv 元数据的 Comments 字段' if explicit else None,
            'priorityScore': score, 'priorityTier': tier, 'priorityReason': f'按相关性、新颖性、技术复用性、潜在影响与证据清晰度综合评分为 {score}/100。',
            'lowPriorityReason': None, 'revisionSummary': None,
        })
    reports.sort(key=lambda item: item['priorityScore'], reverse=True)
    payload = {
        'schemaVersion': 1,
        'run': {'runId': f"initial-{source['announcementDate']}", 'scheduledFor': now, 'startedAt': now, 'completedAt': now, 'sourceCursor': now},
        'announcementDay': {'date': source['announcementDate'], 'status': 'announced', 'source': 'arXiv API and official announcement schedule'},
        'dailyVolume': {'announcementDate': source['announcementDate'], 'mathDg': 36, 'mathMg': 12, 'mathGt': 9, 'totalUnique': 54, 'crosslistOverlap': 3},
        'reports': reports,
    }
    Path(args.out).write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding='utf-8')
    print(f"Built {len(reports)} curated report entries")


if __name__ == '__main__':
    main()
