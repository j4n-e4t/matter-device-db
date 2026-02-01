import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Download, ExternalLink, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ProtocolBadge,
  CapabilityBadge,
  PowerSupplyBadge,
  GenericBadge,
} from "@/components/badges"
import { getAllDevices, getDeviceById, getManufacturerById, featureLabels } from "@/lib/devices"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ThemeToggle } from "@/components/theme-toggle"

export async function generateStaticParams() {
  const devices = getAllDevices()
  return devices.map((device) => ({ id: device.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const device = getDeviceById(id)
  if (!device) return { title: "Device Not Found" }

  const manufacturer = getManufacturerById(device.manufacturer_id)
  return {
    title: `${device.name} by ${manufacturer?.name || device.manufacturer_id} - Matter Device DB`,
    description: `View details for ${device.name}, a device with ${device.capabilities.join(", ")} capabilities and ${device.protocols.join(", ")} support.`,
  }
}

export default async function DeviceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const device = getDeviceById(id)

  if (!device) {
    notFound()
  }

  const manufacturer = getManufacturerById(device.manufacturer_id)

  return (
    <div className="min-h-screen">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 338.667 72.644" className="h-5 w-auto fill-primary"><path d="M294.697 60.122c6.777 0 12.314-3.055 15.781-7.762l-3.725-2.121c-2.691 3.415-6.831 5.641-12.056 5.641-8.464 0-14.985-5.832-15.666-13.294h33.565c.024-.441.05-.881.05-1.293 0-10.397-8.482-18.831-18.854-18.831s-18.802 8.435-18.802 18.832 8.43 18.829 19.706 18.829zm-.877-33.419c7.068 0 13.213 5.068 14.568 11.796h-29.139c1.346-6.727 7.455-11.796 14.571-11.796zm-99.896-4.243c-10.398 0-18.83 8.435-18.83 18.833s8.432 18.83 18.83 18.83c6.281 0 11.468-3.078 14.59-7.806v7.082h4.24V23.184h-4.24v7.082c-3.122-4.728-8.309-7.806-14.59-7.806zm0 4.243c8.07 0 14.59 6.518 14.59 14.59s-6.52 14.587-14.59 14.587a14.57 14.57 0 0 1-14.587-14.587c0-8.072 6.517-14.59 14.587-14.59zM65.715 32.905c-7.996 2.19-15.164 7.406-19.636 15.152s-5.407 16.568-3.306 24.587l7.835-4.526a23.9 23.9 0 0 1 1.105-11.836l18.309 10.569 4.303-2.487v-4.967L56.016 48.829a23.92 23.92 0 0 1 9.699-6.879zm-57.108 0v9.045a23.91 23.91 0 0 1 9.699 6.879L0 59.398v4.967l4.303 2.487 18.306-10.569c1.39 3.868 1.726 7.938 1.108 11.836l7.832 4.526c2.101-8.02 1.167-16.841-3.306-24.587A32.52 32.52 0 0 0 8.607 32.905zM337.063 22.46c-8.542 0-15.466 6.448-15.466 15.47v21.469h4.243V37.93c0-6.68 5.025-11.227 11.223-11.227h1.604V22.46zm-213.131 0c-8.542 0-15.466 6.448-15.466 15.47v21.469h4.243V37.93c0-6.68 5.023-11.227 11.223-11.227s11.227 4.547 11.227 11.227v21.469h4.243V37.93c0-6.68 5.023-11.227 11.223-11.227s11.227 4.547 11.227 11.227v21.469h4.243V37.93c0-9.021-6.927-15.47-15.47-15.47-5.535 0-10.576 2.848-13.37 8.642-2.845-5.741-7.84-8.642-13.323-8.642zm108.531-11.636l-4.24 2.43v9.931h-5.691v4.087h5.691v23.847c0 4.605 3.621 8.279 8.225 8.279h6.307v-4.243h-6.307c-2.175 0-3.986-1.811-3.986-4.087V27.271h21.574v23.847c0 4.605 3.619 8.279 8.171 8.279h6.364v-4.243h-6.364c-2.12 0-3.929-1.811-3.929-4.087V27.271h10.293v-4.087H258.28v-12.36l-4.243 2.43v9.931h-21.574zM37.161 0l-4.303 2.484v21.138c-4.046-.731-7.736-2.476-10.804-4.961l-7.838 4.522c5.895 5.83 14 9.429 22.946 9.429s17.051-3.599 22.946-9.429l-7.835-4.522a23.92 23.92 0 0 1-10.807 4.961V2.484z" /></svg>
              <Link href="/" className="text-xl font-semibold hover:opacity-80">
                Device DB
              </Link>
            </div>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all devices
          </Link>
        </Button>

        <div className="grid gap-8 md:grid-cols-[300px_1fr]">
          {/* Device Image */}
          <div className="bg-card border rounded-lg p-6 flex items-center justify-center aspect-square">
            {device.imageUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={device.imageUrl}
                  alt={device.name}
                  fill
                  className="object-contain"
                  sizes="300px"
                  priority
                />
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">No image available</div>
            )}
          </div>

          {/* Device Details */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                {manufacturer?.logo && (
                  <img
                    src={manufacturer.logo}
                    alt={manufacturer.name}
                    className="w-8 h-8 object-contain rounded"
                  />
                )}
                <span className="text-muted-foreground">
                  {manufacturer?.name || device.manufacturer_id}
                </span>
              </div>
              <h1 className="text-3xl font-bold">{device.name}</h1>
            </div>

            {/* Badges Row */}
            <div className="flex flex-wrap gap-2">
              {device.capabilities.map((capability) => (
                <CapabilityBadge key={capability} capability={capability} />
              ))}
              {device.powerSupply && (
                <PowerSupplyBadge powerSupply={device.powerSupply} />
              )}
            </div>

            {/* Protocols */}
            <div>
              <h2 className="text-sm font-medium text-muted-foreground mb-2">Protocols</h2>
              <div className="flex flex-wrap gap-2">
                {device.protocols.map((protocol) => (
                  <ProtocolBadge key={protocol} protocol={protocol} />
                ))}
              </div>
            </div>

            {/* Features */}
            {device.features && device.features.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-2">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {device.features.map((feature) => (
                    <GenericBadge key={feature} color="default">
                      {featureLabels[feature] || feature}
                    </GenericBadge>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Release Date */}
              {device.releaseDate && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Released:</span>
                  <span>{new Date(device.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                </div>
              )}

              {/* OTA Support */}
              {device.supportsOTA !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">OTA Updates:</span>
                  <span className={device.supportsOTA ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                    {device.supportsOTA ? "Supported" : "Not supported"}
                  </span>
                </div>
              )}

              {/* Last Updated */}
              {device.meta?.last_updated && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Last updated:</span>
                  <span>{new Date(device.meta.last_updated).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Pricing Table */}
            {device.prices && device.prices.length > 0 && (
              <div className="bg-card border rounded-lg">
                <div className="p-4 border-b">
                  <h2 className="text-base font-semibold">Store pricing</h2>
                  <p className="text-sm text-muted-foreground">Compare current pricing across retailers.</p>
                </div>
                <div className="p-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Store</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Last updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {device.prices.map((price) => (
                        <TableRow key={`${device.id}-${price.store}`}>
                          <TableCell className="font-medium">{price.store}</TableCell>
                          <TableCell>
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: price.currency || "USD",
                            }).format(price.price)}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {price.lastUpdated
                              ? new Date(price.lastUpdated).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })
                              : "—"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}

            {/* Manufacturer Link */}
            {manufacturer?.website && (
              <div className="pt-4 border-t">
                <Button variant="outline" asChild>
                  <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit {manufacturer.name}
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
