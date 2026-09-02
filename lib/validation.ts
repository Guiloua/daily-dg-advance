import { z } from 'zod';
import { TOPICS } from './types';

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const isoDateTime = z.iso.datetime({ offset: true });

export const paperReportSchema = z
  .object({
    announcementDate: isoDate,
    arxivId: z.string().regex(/^(?:[a-z-]+\/\d{7}|\d{4}\.\d{4,5})$/),
    version: z.number().int().positive(),
    entryKind: z.enum(['new', 'revision']),
    title: z.string().min(1).max(1000),
    authors: z.array(z.string().min(1).max(300)).min(1).max(200),
    abstract: z.string().min(1).max(30000),
    categories: z.array(z.string().min(2).max(40)).min(1).max(50),
    primaryCategory: z.string().min(2).max(40),
    arxivUrl: z.url(),
    pdfUrl: z.url(),
    submittedAt: isoDateTime,
    updatedAt: isoDateTime,
    topic: z.enum(TOPICS),
    progressType: z.string().min(1).max(80),
    workSummary: z.string().min(1).max(5000),
    techniques: z.array(z.string().min(1).max(300)).max(20),
    breakthrough: z.string().min(1).max(5000),
    limitations: z.string().min(1).max(5000),
    analysisDepth: z.enum(['abstract', 'full_text_sections']),
    aiStatus: z.enum(['explicit', 'no_disclosure_observed']),
    aiEvidence: z.string().max(3000).nullish(),
    aiEvidenceSource: z.string().max(300).nullish(),
    priorityScore: z.number().int().min(0).max(100),
    priorityTier: z.enum(['high', 'medium', 'low']),
    priorityReason: z.string().min(1).max(3000),
    lowPriorityReason: z.string().max(3000).nullish(),
    revisionSummary: z.string().max(5000).nullish(),
  })
  .superRefine((value, context) => {
    const expectedTier =
      value.priorityScore >= 75
        ? 'high'
        : value.priorityScore >= 50
          ? 'medium'
          : 'low';
    if (value.priorityTier !== expectedTier)
      context.addIssue({
        code: 'custom',
        path: ['priorityTier'],
        message: `priorityTier must be ${expectedTier}`,
      });
    if (value.priorityTier === 'low' && !value.lowPriorityReason)
      context.addIssue({
        code: 'custom',
        path: ['lowPriorityReason'],
        message: 'lowPriorityReason is required for low priority work',
      });
    if (
      value.aiStatus === 'explicit' &&
      (!value.aiEvidence || !value.aiEvidenceSource)
    )
      context.addIssue({
        code: 'custom',
        path: ['aiEvidence'],
        message: 'explicit AI collaboration requires evidence and source',
      });
  });

export const reportBatchV1Schema = z
  .object({
    schemaVersion: z.literal(1),
    run: z.object({
      runId: z.string().min(8).max(120),
      scheduledFor: isoDateTime,
      startedAt: isoDateTime,
      completedAt: isoDateTime,
      sourceCursor: isoDateTime,
    }),
    announcementDay: z.object({
      date: isoDate,
      status: z.literal('announced'),
      source: z.string().min(1).max(500),
    }),
    dailyVolume: z.object({
      announcementDate: isoDate,
      mathDg: z.number().int().nonnegative(),
      mathMg: z.number().int().nonnegative(),
      mathGt: z.number().int().nonnegative(),
      totalUnique: z.number().int().nonnegative(),
      crosslistOverlap: z.number().int().nonnegative(),
    }),
    reports: z.array(paperReportSchema).max(300),
  })
  .superRefine((value, context) => {
    if (value.dailyVolume.announcementDate !== value.announcementDay.date)
      context.addIssue({
        code: 'custom',
        path: ['dailyVolume', 'announcementDate'],
        message: 'dates must match',
      });
    if (
      value.reports.some(
        (report) => report.announcementDate !== value.announcementDay.date,
      )
    )
      context.addIssue({
        code: 'custom',
        path: ['reports'],
        message: 'all report dates must match announcement day',
      });
    const sum =
      value.dailyVolume.mathDg +
      value.dailyVolume.mathMg +
      value.dailyVolume.mathGt;
    if (
      sum - value.dailyVolume.crosslistOverlap !==
      value.dailyVolume.totalUnique
    )
      context.addIssue({
        code: 'custom',
        path: ['dailyVolume'],
        message: 'volume totals are inconsistent',
      });
  });

export type ReportBatchV1 = z.infer<typeof reportBatchV1Schema>;

export const volumeHistoryV1Schema = z.object({
  schemaVersion: z.literal(1),
  generatedAt: isoDateTime,
  source: z.string().min(1).max(500),
  points: z
    .array(
      z
        .object({
          announcementDate: isoDate,
          mathDg: z.number().int().nonnegative(),
          mathMg: z.number().int().nonnegative(),
          mathGt: z.number().int().nonnegative(),
          totalUnique: z.number().int().nonnegative(),
          crosslistOverlap: z.number().int().nonnegative(),
        })
        .superRefine((value, context) => {
          const sum = value.mathDg + value.mathMg + value.mathGt;
          if (sum - value.crosslistOverlap !== value.totalUnique)
            context.addIssue({
              code: 'custom',
              message: 'volume totals are inconsistent',
            });
        }),
    )
    .min(1)
    .max(600),
});

export type VolumeHistoryV1 = z.infer<typeof volumeHistoryV1Schema>;
