import React from 'react';

// This component acts as a shell for global providers if needed in the future.
// The RouterProvider handles the main tree rendering in main.tsx.
export default function App({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}