import './globals.css';
import {TopNav} from '@/components/TopNav';
export const metadata={title:'Aether Partner Path',description:'A meritocratic partner operating system for a FundingPips-style prop firm.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <><TopNav/><main>{children}</main><footer className="border-t border-white/10 py-10 text-center text-xs text-[#8b97a8]">Aether Partner Path · Net challenge fee economics · Human review for edge cases</footer></>}
