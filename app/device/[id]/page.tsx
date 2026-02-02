import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, Download, ExternalLink, Clock, User, ShoppingBag, Cpu, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
  MatterSupportBadge,
  GenericBadge,
} from "@/components/badges"
import { Header } from "@/components/header"
import { getAllDevices, getDeviceById, getManufacturerById, featureLabels } from "@/lib/devices"
import { getStoreConfigByName } from "@/data/stores"

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
  const hasStoreLinks = (device.storeUrls && device.storeUrls.length > 0) || manufacturer?.website
  const hasMetadata = device.releaseDate || device.supportsOTA !== undefined ||
    (device.contributors && device.contributors.length > 0) || device.meta?.last_updated

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

        {/* Device Header */}
        <div className="mb-6 md:mb-8 text-center md:text-left">
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

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          {/* Left Column - Image */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-4 md:p-6">
                <div className="aspect-square flex items-center justify-center">
                  {device.imageUrl ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={device.imageUrl}
                        alt={device.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 320px"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="text-muted-foreground text-sm">No image available</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Where to Buy - Desktop (shown in left column) */}
            {hasStoreLinks && (
              <Card className="hidden lg:flex">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShoppingBag className="h-4 w-4" />
                    Where to Buy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {device.storeUrls && device.storeUrls.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {device.storeUrls.map((store, index) => {
                        const config = getStoreConfigByName(store.name)
                        const Icon = config.icon
                        return (
                          <a
                            key={index}
                            href={store.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${config.color}`}
                          >
                            <Icon className="h-4 w-4" />
                            {store.name}
                            <ExternalLink className="h-3 w-3 opacity-50 ml-auto" />
                          </a>
                        )
                      })}
                    </div>
                  )}
                  {manufacturer?.website && (
                    <Button variant="outline" asChild className="w-full">
                      <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit {manufacturer.name}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Specifications Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Cpu className="h-4 w-4" />
                  Specifications
                </CardTitle>
              </CardHeader>
              <CardContent>
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
                      {device.matterSupport && (
                        <TableRow>
                          <TableCell className="font-medium text-muted-foreground">Matter Support</TableCell>
                          <TableCell>
                            <MatterSupportBadge matterSupport={device.matterSupport} />
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>

                {/* Features */}
                {device.features && device.features.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {device.features.map((feature) => (
                        <GenericBadge key={feature} color="default">
                          {featureLabels[feature] || feature}
                        </GenericBadge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Where to Buy - Mobile (shown below specs) */}
            {hasStoreLinks && (
              <Card className="lg:hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <ShoppingBag className="h-4 w-4" />
                    Where to Buy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {device.storeUrls && device.storeUrls.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {device.storeUrls.map((store, index) => {
                        const config = getStoreConfigByName(store.name)
                        const Icon = config.icon
                        return (
                          <a
                            key={index}
                            href={store.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-medium transition-colors ${config.color}`}
                          >
                            <Icon className="h-4 w-4" />
                            {store.name}
                            <ExternalLink className="h-3 w-3 opacity-50" />
                          </a>
                        )
                      })}
                    </div>
                  )}
                  {manufacturer?.website && (
                    <Button variant="outline" asChild className="w-full sm:w-auto">
                      <a href={manufacturer.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Visit {manufacturer.name}
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Metadata Card */}
            {hasMetadata && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Info className="h-4 w-4" />
                    Additional Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Release Date */}
                    {device.releaseDate && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground">Released:</span>
                        <span>{new Date(device.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                      </div>
                    )}

                    {/* OTA Support */}
                    {device.supportsOTA !== undefined && (
                      <div className="flex items-center gap-2 text-sm">
                        <Download className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground">OTA Updates:</span>
                        <span className={device.supportsOTA ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                          {device.supportsOTA ? "Supported" : "Not supported"}
                        </span>
                      </div>
                    )}

                    {/* Contributors */}
                    {device.contributors && device.contributors.length > 0 && (
                      <div className="flex items-center gap-2 text-sm flex-wrap">
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
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-muted-foreground">Last updated:</span>
                        <span>{new Date(device.meta.last_updated).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
