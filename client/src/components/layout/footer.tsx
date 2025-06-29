import { Link } from "wouter";
import { Zap, Twitter, Github, Linkedin } from "lucide-react";

const navigation = [
  { name: "Device Tracking", href: "/tracking" },
  { name: "Documentation", href: "/documentation" },
  { name: "Issue Monitoring", href: "/monitoring" },
  { name: "Developer API", href: "/developer" },
  { name: "FAQ", href: "/faq" },
  { name: "About", href: "/about" }
];

export default function Footer() {
  const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
  
  const FooterLink = ({ href, children, className }: { href: string; children: React.ReactNode; className: string }) => {
    if (isGitHubPages) {
      const fullHref = `https://dogoodbenice.github.io/electrichomehub${href}`;
      return <a href={fullHref} className={className}>{children}</a>;
    }
    return <Link href={href} className={className}>{children}</Link>;
  };

  return (
    <footer className="border-t border-card bg-black mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">Electric Home Hub</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Simplifying smart home device management across all brands and platforms.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><FooterLink href="/tracking" className="hover:text-brand-red transition-colors">Device Tracking</FooterLink></li>
              <li><FooterLink href="/documentation" className="hover:text-brand-red transition-colors">Documentation</FooterLink></li>
              <li><FooterLink href="/monitoring" className="hover:text-brand-red transition-colors">Issue Monitoring</FooterLink></li>
              <li><FooterLink href="/developer" className="hover:text-brand-red transition-colors">Developer API</FooterLink></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><FooterLink href="/faq" className="hover:text-brand-red transition-colors">FAQ</FooterLink></li>
              <li><FooterLink href="/documentation" className="hover:text-brand-red transition-colors">Documentation</FooterLink></li>
            </ul>
          </div>
          
          
        </div>
        
        <div className="border-t border-card mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 Electric Home Hub. Built with love as a concept by Suraj.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-muted-foreground hover:text-brand-red transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-brand-red transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-brand-red transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
