import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { login } from '@/lib/auth';

export const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-muted/10">
      <div className="w-full max-w-md p-8 bg-background shadow-xl border">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl mb-2">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Enter your credentials to access the workspace.</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              className="w-full h-10 px-3 border bg-transparent focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="name@fashionos.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full h-10 px-3 border bg-transparent focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="••••••••"
            />
          </div>
          <Button className="w-full" size="lg">Sign In</Button>
        </form>
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <a href="#" className="underline">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};