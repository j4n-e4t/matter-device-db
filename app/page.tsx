import { Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/devices/data-table';
import { columns } from '@/components/devices/columns';
import { ThemeToggle } from '@/components/theme-toggle';
import { getAllDevices } from '@/lib/devices';

export default function HomePage() {
  const devices = getAllDevices();

  return (
    <div className="min-h-screen">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Matter Devices DB</h1>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <a
                  href="https://github.com/your-org/matter-device-db"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                </a>
              </Button>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <DataTable columns={columns} data={devices} />
      </main>
    </div>
  );
}
