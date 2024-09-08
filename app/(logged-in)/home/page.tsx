"use client"

import { withAuth } from '@/components/Auth/withAuth';
import OpenSourceInteractiveMap from '@/components/Maps/interactive-world-map';

function HomePage() {
  return (
    <main className="h-full w-full">
      <OpenSourceInteractiveMap />
    </main>
  );
}

export default withAuth(HomePage);
