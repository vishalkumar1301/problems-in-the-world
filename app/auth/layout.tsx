import React from 'react';
import LoggedOutHeader from '@/components/Headers/LoggedOutHeader';


interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <LoggedOutHeader />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-md w-full space-y-8">
          {children}
        </div>
      </div>
    </>
  );
}
