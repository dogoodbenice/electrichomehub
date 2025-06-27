import { Link } from "wouter";
import { Zap, Twitter, Github, Linkedin } from "lucide-react";

export default function Footer() {
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
              <li><Link href="/tracking" className="hover:text-brand-red transition-colors">Device Tracking</Link></li>
              <li><Link href="/documentation" className="hover:text-brand-red transition-colors">Documentation</Link></li>
              <li><Link href="/monitoring" className="hover:text-brand-red transition-colors">Issue Monitoring</Link></li>
              <li><Link href="/developer" className="hover:text-brand-red transition-colors">Developer API</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/faq" className="hover:text-brand-red transition-colors">FAQ</Link></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Contact Support</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Status Page</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-brand-red transition-colors">About</Link></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-red transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-card mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2025 Electric Home Hub. Built with love from Axle Energy.</p>
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
