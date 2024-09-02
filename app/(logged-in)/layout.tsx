import React from 'react';

interface PageLayoutProps {
  title: string;
  children: React.ReactNode;
}

function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="w-full md:w-[600px]">
        <h1 className="text-3xl font-bold my-4">{title}</h1>
        {children}
      </div>
    </div>
  );
}

export default function LoggedInLayout({ children }: { children: React.ReactNode }) {
  return <PageLayout title="">{children}</PageLayout>;
}