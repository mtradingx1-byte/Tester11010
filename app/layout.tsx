import './globals.css';
import { TopNav } from '@/components/TopNav';

export const metadata = {
  title: 'Aether Partner Path',
  description: 'A meritocratic partner operating system for a FundingPips-style prop firm.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  );
}
