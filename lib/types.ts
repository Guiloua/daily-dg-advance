export const TOPICS = [
  '曲率与比较几何',
  '度量测度几何、极限与奇异空间',
  '几何分析、几何 PDE 与几何流',
  '黎曼、亚黎曼、Finsler及特殊几何结构',
  '几何拓扑、低维流形与结',
  '交叉方向与基础工具',
] as const;

export type Topic = (typeof TOPICS)[number];
export type AiStatus = 'explicit' | 'no_disclosure_observed';
export type PriorityTier = 'high' | 'medium' | 'low';

export interface VolumePoint {
  announcementDate: string;
  mathDg: number;
  mathMg: number;
  mathGt: number;
  totalUnique: number;
  crosslistOverlap: number;
}

export interface WeeklyVolumePoint {
  weekStart: string;
  weekEnding: string;
  mathDg: number;
  mathMg: number;
  mathGt: number;
  totalUnique: number;
  crosslistOverlap: number;
}

export interface PaperReport {
  id: string;
  announcementDate: string;
  arxivId: string;
  version: number;
  entryKind: 'new' | 'revision';
  title: string;
  authors: string[];
  abstract: string;
  categories: string[];
  primaryCategory: string;
  arxivUrl: string;
  pdfUrl: string;
  submittedAt: string;
  updatedAt: string;
  topic: Topic;
  progressType: string;
  workSummary: string;
  techniques: string[];
  breakthrough: string;
  limitations: string;
  analysisDepth: 'abstract' | 'full_text_sections';
  aiStatus: AiStatus;
  aiEvidence?: string | null;
  aiEvidenceSource?: string | null;
  priorityScore: number;
  priorityTier: PriorityTier;
  priorityReason: string;
  lowPriorityReason?: string | null;
  revisionSummary?: string | null;
}

export interface DashboardData {
  latestDate: string;
  lastUpdated: string;
  volumes: VolumePoint[];
  reports: PaperReport[];
  dataMode: 'database' | 'preview';
}
