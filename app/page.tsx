import { Suspense } from 'react';
import { Header } from '@/components/header';
import { DataTable } from '@/components/devices/data-table';
import { columns } from '@/components/devices/columns';
import { getAllDevices } from '@/lib/devices';

export default function HomePage() {
  const devices = getAllDevices();

  return (
    <div className="min-h-screen">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<div className="h-96 flex items-center justify-center text-muted-foreground">Loading devices...</div>}>
          <DataTable columns={columns} data={devices} />
        </Suspense>
      </main>
    </div>
  );
}
