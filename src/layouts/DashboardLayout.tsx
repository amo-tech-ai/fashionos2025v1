
import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Folder, Settings, LogOut, Sparkles, Wand2, ClipboardList, Camera, Menu, X, Mic, Users2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { logout } from '@/lib/auth';
import { AIAgent } from '@/components/ai/AIAgent';
import { LiveConsole } from '@/components/dashboard/LiveConsole';
import { cn } from '@/lib/utils';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLiveConsoleOpen, setIsLiveConsoleOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
    { icon: Sparkles, label: 'Intelligence', path: '/dashboard/intelligence' },
    { icon: Wand2, label: 'Creative Studio', path: '/dashboard/studio' },
    { icon: Folder, label: 'Collections', path: '/dashboard/projects' },
    { icon: ClipboardList, label: 'Tasks', path: '/dashboard/tasks' },
    { icon: Camera, label: 'Runway', path: '/dashboard/events' },
    { icon: Users2, label: 'Relationships', path: '/dashboard/crm' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className="min-h-screen flex bg-[#fafafa] font-sans">
      <LiveConsole isOpen={isLiveConsoleOpen} onClose={() => setIsLiveConsoleOpen(false)} />

      {/* Mobile Trigger */}
      <button 
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-10 left-10 w-16 h-16 bg-white border border-border shadow-2xl flex items-center justify-center z-[55] rounded-none"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <aside className={cn(
        "w-64 bg-white border-r flex flex-col fixed h-full z-[70] transition-transform duration-500 lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <Link to="/dashboard" className="font-serif text-2xl font-bold tracking-tighter">fashionOS</Link>
          <button className="lg:hidden p-2" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                variant="ghost" 
                className={cn(
                  "w-full justify-start gap-3 rounded-none border-l-2 border-transparent transition-all h-12",
                  location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path)) 
                    ? "bg-muted border-primary text-primary" 
                    : "text-muted-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </Button>
            </Link>
          ))}
          
          <div className="pt-8 px-2">
             <Button 
               onClick={() => setIsLiveConsoleOpen(true)}
               variant="primary" 
               className="w-full justify-start gap-3 rounded-none h-14 shadow-lg group"
             >
                <Mic className="h-4 w-4 group-hover:animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Live Assist</span>
             </Button>
          </div>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start gap-3 rounded-none h-12" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            <span className="text-[10px] font-black uppercase tracking-widest">Sign Out</span>
          </Button>
        </div>
      </aside>
      
      <main className="flex-1 lg:ml-64 relative min-h-screen overflow-x-hidden">
        <Outlet />
        <AIAgent />
      </main>
    </div>
  );
};
