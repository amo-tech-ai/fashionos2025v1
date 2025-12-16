import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground font-sans p-4">
      <div className="text-center space-y-6 max-w-lg">
        <p className="font-serif text-9xl italic text-muted-foreground opacity-20 select-none">404</p>
        <h1 className="font-serif text-4xl md:text-5xl font-medium">Page Not Found</h1>
        <p className="text-muted-foreground leading-relaxed">
          The page you are looking for has been moved, removed, or does not exist.
        </p>
        <div className="pt-4">
          <Link to="/">
            <Button variant="primary" size="lg">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};