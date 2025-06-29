import { Link, useLocation } from "wouter";
import { Zap, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getBasePath } from "@/lib/staticData";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Device Tracking", href: "/tracking" },
  { name: "Documentation", href: "/documentation" },
  { name: "Issue Monitoring", href: "/monitoring" },
  { name: "Developer API", href: "/developer", featured: true },
  { name: "Data Export", href: "/data-export" },
  { name: "FAQ", href: "/faq" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const basePath = getBasePath();
  
  // For GitHub Pages, use full URL for logo navigation
  const isGitHubPages = window.location.hostname.includes('github.io');
  const logoHref = isGitHubPages ? 'https://dogoodbenice.github.io/electrichomehub/' : '/';

  return (
    <header className="border-b border-card bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          {isGitHubPages ? (
            <a href={logoHref} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Electric Home Hub</span>
            </a>
          ) : (
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Electric Home Hub</span>
            </Link>
          )}
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              // For GitHub Pages, use full URLs to ensure proper navigation
              const navHref = isGitHubPages ? 
                `https://dogoodbenice.github.io/electrichomehub${item.href === '/' ? '' : item.href}` : 
                item.href;
              
              return isGitHubPages ? (
                <a
                  key={item.name}
                  href={navHref}
                  className={`nav-link text-sm font-medium transition-colors ${
                    location === item.href 
                      ? "text-brand-red" 
                      : item.featured 
                        ? "text-brand-red font-semibold border border-brand-red px-3 py-1 rounded-lg hover:bg-brand-red hover:text-white"
                        : "text-white hover:text-brand-red"
                  }`}
                >
                  {item.name}
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link text-sm font-medium transition-colors ${
                    location === item.href 
                      ? "text-brand-red" 
                      : item.featured 
                        ? "text-brand-red font-semibold border border-brand-red px-3 py-1 rounded-lg hover:bg-brand-red hover:text-white"
                        : "text-white hover:text-brand-red"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          
          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-black border-card">
              <nav className="flex flex-col space-y-4 mt-6">
                {navigation.map((item) => {
                  const navHref = isGitHubPages ? 
                    `https://dogoodbenice.github.io/electrichomehub${item.href === '/' ? '' : item.href}` : 
                    item.href;
                  
                  return isGitHubPages ? (
                    <a
                      key={item.name}
                      href={navHref}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`nav-link text-sm font-medium transition-colors ${
                        location === item.href 
                          ? "text-brand-red" 
                          : item.featured 
                            ? "text-brand-red font-semibold border border-brand-red px-3 py-1 rounded-lg hover:bg-brand-red hover:text-white"
                            : "text-white hover:text-brand-red"
                      }`}
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`nav-link text-sm font-medium transition-colors ${
                        location === item.href 
                          ? "text-brand-red" 
                          : item.featured 
                            ? "text-brand-red font-semibold border border-brand-red px-3 py-1 rounded-lg hover:bg-brand-red hover:text-white"
                            : "text-white hover:text-brand-red"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
