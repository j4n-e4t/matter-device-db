import type { Device, FilterState, Manufacturer } from './types';
import devicesData from '@/data/devices.json';
import manufacturersData from '@/data/manufacturers.json';


// Manufacturers
export function getAllManufacturers(): Manufacturer[] {
  return manufacturersData as Manufacturer[];
}

export function getManufacturerById(id: string): Manufacturer | undefined {
  return getAllManufacturers().find((m) => m.id === id);
}

export function getManufacturerName(id: string): string {
  return getManufacturerById(id)?.name || id;
}

// Devices
export function getAllDevices(): Device[] {
  return devicesData as Device[];
}

export function getDeviceById(id: string): Device | undefined {
  return getAllDevices().find((device) => device.id === id);
}

export function getAllDeviceIds(): string[] {
  return getAllDevices().map((device) => device.id);
}

export function filterDevices(devices: Device[], filters: FilterState): Device[] {
  return devices.filter((device) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const manufacturerName = getManufacturerName(device.manufacturer_id);
      const matchesSearch =
        device.name.toLowerCase().includes(searchLower) ||
        manufacturerName.toLowerCase().includes(searchLower) ||
        device.features?.some((f) => f.toLowerCase().includes(searchLower));

      if (!matchesSearch) return false;
    }

    // Manufacturer filter
    if (filters.manufacturer && device.manufacturer_id !== filters.manufacturer) {
      return false;
    }

    // Capability filter
    if (filters.capability && !device.capabilities.includes(filters.capability)) {
      return false;
    }

    // Power supply filter
    if (filters.powerSupply && device.powerSupply !== filters.powerSupply) {
      return false;
    }

    return true;
  });
}

export function getUniqueManufacturerIds(devices: Device[]): string[] {
  const ids = new Set(devices.map((d) => d.manufacturer_id));
  return Array.from(ids).sort((a, b) => {
    const nameA = getManufacturerName(a);
    const nameB = getManufacturerName(b);
    return nameA.localeCompare(nameB);
  });
}

export function getUniqueProtocols(devices: Device[]): string[] {
  const protocols = new Set<string>();
  devices.forEach((d) => d.protocols.forEach((p) => protocols.add(p)));
  return Array.from(protocols).sort();
}

export function getUniqueCapabilities(devices: Device[]): string[] {
  const capabilities = new Set<string>();
  devices.forEach((d) => d.capabilities.forEach((c) => capabilities.add(c)));
  return Array.from(capabilities).sort();
}

export function getUniquePowerSupplies(devices: Device[]): string[] {
  const supplies = new Set<string>();
  devices.forEach((d) => {
    if (d.powerSupply) supplies.add(d.powerSupply);
  });
  return Array.from(supplies).sort();
}

export function getUniqueMatterSupport(devices: Device[]): string[] {
  const supports = new Set<string>();
  devices.forEach((d) => {
    if (d.matterSupport) supports.add(d.matterSupport);
  });
  return Array.from(supports).sort();
}

export function getDeviceStats(devices: Device[]) {
  const allCapabilities = new Set<string>();
  devices.forEach((d) => d.capabilities.forEach((c) => allCapabilities.add(c)));
  return {
    total: devices.length,
    withMatter: devices.filter((d) => d.protocols.includes('Matter')).length,
    withThread: devices.filter((d) => d.protocols.includes('Thread')).length,
    batteryPowered: devices.filter((d) => d.powerSupply === 'battery').length,
    manufacturers: new Set(devices.map((d) => d.manufacturer_id)).size,
    capabilities: allCapabilities.size,
  };
}

export const capabilityLabels: Record<string, string> = {
  light: 'Light',
  plug: 'Plug',
  switch: 'Switch',
  lock: 'Lock',
  thermostat: 'Thermostat',
  camera: 'Camera',
  hub: 'Hub',
  bridge: 'Bridge',
  blind: 'Blind',
  speaker: 'Speaker',
  climate: 'Climate',
  remote: 'Remote',
  temperature: 'Temperature',
  humidity: 'Humidity',
  motion: 'Motion',
  water_leak: 'Water Leak',
  contact: 'Contact',
  brightness: 'Brightness',
  air_quality: 'Air Quality',
  other: 'Other',
};

export const capabilityIcons: Record<string, string> = {
  light: '💡',
  plug: '🔌',
  switch: '🎚️',
  lock: '🔐',
  thermostat: '🌡️',
  camera: '📷',
  hub: '🎛️',
  bridge: '🌉',
  blind: '🪟',
  speaker: '🔊',
  climate: '❄️',
  remote: '🎮',
  temperature: '🌡️',
  humidity: '💧',
  motion: '👋',
  water_leak: '💦',
  contact: '🚪',
  brightness: '☀️',
  air_quality: '💨',
  other: '📦',
};

export const powerSupplyLabels: Record<string, string> = {
  mains: 'Mains',
  battery: 'Battery',
  poe: 'PoE',
  usb: 'USB',
};

export const featureLabels: Record<string, string> = {
  brightness_control: 'Brightness',
  color_temperature_control: 'Color temperature',
  color_control: 'Color control',
  on_off: 'On/Off',
  dimming: 'Dimming',
  motion_detection: 'Motion',
  temperature_measurement: 'Temperature',
  temperature_sensor: 'Temperature',
  humidity_measurement: 'Humidity',
  humidity_sensor: 'Humidity',
  door_window_state: 'Door/Window',
  energy_measurement: 'Energy measurement',
};
