import React from 'react';
import LoggedInHeader from '@/components/Headers/LoggedInHeader';
import { MapProvider } from '@/contexts/MapContext';

export default function LoggedInLayout({ children }: { children: React.ReactNode }) {
  return (
    <MapProvider>
      <LoggedInHeader />
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="w-full md:w-[600px]">
          {children}
        </div>
      </div>
    </MapProvider>
  );
}