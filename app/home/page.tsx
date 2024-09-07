"use client"

import OpenSourceInteractiveMap from '@/components/Maps/interactive-world-map';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <OpenSourceInteractiveMap />
    </main>
  );
}