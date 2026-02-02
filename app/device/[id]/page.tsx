import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Download, ExternalLink, Clock, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table"
import {
  ProtocolBadge,
  CapabilityBadge,
  PowerSupplyBadge,
  GenericBadge,
} from "@/components/badges"
import { Header } from "@/components/header"
import { getAllDevices, getDeviceById, getManufacturerById, featureLabels } from "@/lib/devices"

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
      <Header />

      <main className="container mx-auto px-4 py-6 md:py-8">
        <Button variant="ghost" size="sm" asChild className="mb-4 md:mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to all devices
          </Link>
        </Button>

        <div className="grid gap-6 md:gap-8 md:grid-cols-[300px_1fr]">
          {/* Device Image - smaller on mobile */}
          <div className="bg-card border rounded-lg p-4 md:p-6 flex items-center justify-center aspect-square max-w-[200px] mx-auto md:max-w-none md:mx-0">
            {device.imageUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={device.imageUrl}
                  alt={device.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 200px, 300px"
                  priority
                />
              </div>
            ) : (
              <div className="text-muted-foreground text-sm">No image available</div>
            )}
          </div>

          {/* Device Details */}
          <div className="space-y-4 md:space-y-6">
            {/* Header */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                {manufacturer?.logo && (
                  <img
                    src={manufacturer.logo}
                    alt={manufacturer.name}
                    className="w-6 h-6 md:w-8 md:h-8 object-contain rounded"
                  />
                )}
                <span className="text-sm md:text-base text-muted-foreground">
                  {manufacturer?.name || device.manufacturer_id}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">{device.name}</h1>
            </div>

            {/* Device Specs Table */}
            <div className="rounded-md border">
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground w-[120px] md:w-[140px]">Capabilities</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {device.capabilities.map((capability) => (
                          <CapabilityBadge key={capability} capability={capability} />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-muted-foreground">Protocols</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {device.protocols.map((protocol) => (
                          <ProtocolBadge key={protocol} protocol={protocol} />
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                  {device.powerSupply && (
                    <TableRow>
                      <TableCell className="font-medium text-muted-foreground">Power Supply</TableCell>
                      <TableCell>
                        <PowerSupplyBadge powerSupply={device.powerSupply} />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Features */}
            {device.features && device.features.length > 0 && (
              <div>
                <h2 className="text-sm font-medium text-muted-foreground mb-2 text-center md:text-left">Features</h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                  {device.features.map((feature) => (
                    <GenericBadge key={feature} color="default">
                      {featureLabels[feature] || feature}
                    </GenericBadge>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            <div className="grid gap-3 md:gap-4 grid-cols-1 sm:grid-cols-2">
              {/* Release Date */}
              {device.releaseDate && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Released:</span>
                  <span>{new Date(device.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                </div>
              )}

              {/* OTA Support */}
              {device.supportsOTA !== undefined && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                  <Download className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">OTA Updates:</span>
                  <span className={device.supportsOTA ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                    {device.supportsOTA ? "Supported" : "Not supported"}
                  </span>
                </div>
              )}

              {/* Contributors */}
              {device.contributors && device.contributors.length > 0 && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm flex-wrap">
                  <User className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground shrink-0">Added by:</span>
                  <span className="flex flex-wrap gap-1">
                    {device.contributors.map((contributor, index) => (
                      <span key={contributor}>
                        <a
                          href={`https://github.com/${contributor}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          @{contributor}
                        </a>
                        {index < device.contributors!.length - 1 && ","}
                      </span>
                    ))}
                  </span>
                </div>
              )}

              {/* Last Updated */}
              {device.meta?.last_updated && (
                <div className="flex items-center justify-center md:justify-start gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Last updated:</span>
                  <span>{new Date(device.meta.last_updated).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {/* Manufacturer Link */}
            {manufacturer?.website && (
              <div className="pt-4 border-t flex justify-center md:justify-start">
                <Button variant="outline" asChild className="w-full sm:w-auto">
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
