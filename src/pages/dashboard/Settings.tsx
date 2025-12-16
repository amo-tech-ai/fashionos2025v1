import React from 'react';
import { Button } from '@/components/ui/Button';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="font-serif text-3xl">Settings</h1>
      
      <div className="bg-background p-8 border space-y-6">
        <div>
          <h3 className="font-medium mb-1">Profile Information</h3>
          <p className="text-sm text-muted-foreground mb-4">Update your account details.</p>
          <div className="grid gap-4">
             <div className="grid gap-2">
               <label className="text-sm">Full Name</label>
               <input className="border p-2" defaultValue="Alexander McQueen" />
             </div>
             <div className="grid gap-2">
               <label className="text-sm">Email</label>
               <input className="border p-2" defaultValue="alexander@fashionos.com" />
             </div>
          </div>
        </div>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};