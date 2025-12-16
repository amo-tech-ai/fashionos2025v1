import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Folder, Settings, LogOut, Shirt, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { logout } from '@/lib/auth';

export const DashboardLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex bg-muted/20 font-sans">
      <aside className="w-64 bg-background border-r flex flex-col fixed h-full">
        <div className="h-16 flex items-center px-6 border-b">
          <Link to="/dashboard" className="font-serif text-xl font-bold">fashionOS</Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link to="/dashboard">
             <Button variant="ghost" className="w-full justify-start gap-3">
               <LayoutDashboard className="h-4 w-4" />
               Overview
             </Button>
          </Link>
          <Link to="/dashboard/projects">
             <Button variant="ghost" className="w-full justify-start gap-3">
               <Folder className="h-4 w-4" />
               Collections
             </Button>
          </Link>
          <Link to="/dashboard/analytics">
             <Button variant="ghost" className="w-full justify-start gap-3">
               <BarChart3 className="h-4 w-4" />
               Analytics
             </Button>
          </Link>
          <Link to="/dashboard/settings">
             <Button variant="ghost" className="w-full justify-start gap-3">
               <Settings className="h-4 w-4" />
               Settings
             </Button>
          </Link>
        </nav>
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start gap-3" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};