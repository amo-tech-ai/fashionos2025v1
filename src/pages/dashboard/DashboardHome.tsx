import React from 'react';

export const DashboardHome: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl">Overview</h1>
        <p className="text-muted-foreground">Welcome back, Alexander.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-background p-6 border shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Active Projects</h3>
            <p className="text-3xl font-serif">12</p>
          </div>
        ))}
      </div>

      <div className="bg-background border p-8 min-h-[400px]">
         <h2 className="text-lg font-medium mb-4">Recent Activity</h2>
         <div className="space-y-4">
           {[1,2,3,4].map(i => (
             <div key={i} className="flex items-center gap-4 py-3 border-b last:border-0">
               <div className="w-10 h-10 bg-muted rounded-full" />
               <div>
                 <p className="text-sm font-medium">New collection assets uploaded</p>
                 <p className="text-xs text-muted-foreground">2 hours ago</p>
               </div>
             </div>
           ))}
         </div>
      </div>
    </div>
  );
};