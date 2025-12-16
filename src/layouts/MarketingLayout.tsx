import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const MarketingLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
             <Button variant="ghost" size="sm" className="-ml-3">
               <Menu className="h-5 w-5" />
             </Button>
             <Link to="/" className="text-2xl font-serif font-semibold tracking-tighter">
               fashionOS
             </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link to="/features" className="hover:text-foreground transition-colors">Platform</Link>
            <Link to="/solutions" className="hover:text-foreground transition-colors">Solutions</Link>
            <Link to="/intelligence" className="hover:text-foreground transition-colors">Intelligence</Link>
            <Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
          </nav>

          <div className="flex items-center gap-4">
             <Button variant="ghost" size="sm">
               <Search className="h-5 w-5" />
             </Button>
             <Link to="/login">
                <Button variant="ghost" size="sm">Log In</Button>
             </Link>
             <Button variant="primary" size="sm">Request Demo</Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-serif text-2xl mb-6">fashionOS</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                The operating system for the modern fashion industry. 
                Orchestrate creation, production, and commerce in one platform.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="#" className="hover:text-white">Brand Management</Link></li>
                <li><Link to="#" className="hover:text-white">Runway & Events</Link></li>
                <li><Link to="#" className="hover:text-white">Digital Showroom</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="#" className="hover:text-white">About Us</Link></li>
                <li><Link to="#" className="hover:text-white">Careers</Link></li>
                <li><Link to="#" className="hover:text-white">Press</Link></li>
              </ul>
            </div>
            <div>
               <h4 className="font-medium mb-4">Subscribe</h4>
               <p className="text-xs text-muted-foreground mb-4">Get the latest fashion intelligence.</p>
               <div className="flex gap-2">
                 <input 
                   type="email" 
                   placeholder="Email address" 
                   className="bg-primary-foreground/10 border-none text-white placeholder:text-white/40 text-sm px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-white/20"
                 />
                 <Button variant="secondary" size="sm">Join</Button>
               </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
            <p>&copy; 2024 FashionOS Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
               <Link to="#" className="hover:text-white">Privacy</Link>
               <Link to="#" className="hover:text-white">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};