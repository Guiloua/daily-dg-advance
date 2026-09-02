import type { Metadata } from 'next';
import { Noto_Sans_SC, Noto_Serif_SC } from 'next/font/google';
import 'katex/dist/katex.min.css';
import './globals.css';

const sans = Noto_Sans_SC({ variable: '--font-sans-cn', subsets: ['latin'], weight: ['400', '500', '600'] });
const serif = Noto_Serif_SC({ variable: '--font-serif-cn', subsets: ['latin'], weight: ['500', '600', '700'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_ORIGIN ?? 'http://localhost:3000'),
  title: '几何前沿日报 · Geometry arXiv Brief',
  description: '追踪微分几何、度量几何与几何拓扑的每日进展。',
  openGraph: { title: '几何前沿日报', description: '微分几何、度量几何与几何拓扑的每日研究简报。', images: ['/og.png'] },
  twitter: { card: 'summary_large_image', title: '几何前沿日报', description: 'Geometry arXiv Brief', images: ['/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body className={`${sans.variable} ${serif.variable} antialiased`}>{children}</body></html>;
}
