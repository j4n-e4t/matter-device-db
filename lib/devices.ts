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

    // Device class filter
    if (filters.device_class && device.device_class !== filters.device_class) {
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

export function getUniqueDeviceClasses(devices: Device[]): string[] {
  const classes = new Set(devices.map((d) => d.device_class));
  return Array.from(classes).sort();
}

export function getUniquePowerSupplies(devices: Device[]): string[] {
  const supplies = new Set<string>();
  devices.forEach((d) => {
    if (d.powerSupply) supplies.add(d.powerSupply);
  });
  return Array.from(supplies).sort();
}

export function getDeviceStats(devices: Device[]) {
  return {
    total: devices.length,
    withMatter: devices.filter((d) => d.protocols.includes('Matter')).length,
    withThread: devices.filter((d) => d.protocols.includes('Thread')).length,
    batteryPowered: devices.filter((d) => d.powerSupply === 'battery').length,
    manufacturers: new Set(devices.map((d) => d.manufacturer_id)).size,
    deviceClasses: new Set(devices.map((d) => d.device_class)).size,
  };
}

export const deviceClassLabels: Record<string, string> = {
  sensor: 'Sensors',
  light: 'Lights',
  plug: 'Plugs',
  switch: 'Switches',
  lock: 'Locks',
  thermostat: 'Thermostats',
  camera: 'Cameras',
  hub: 'Hubs',
  bridge: 'Bridges',
  blind: 'Blinds',
  speaker: 'Speakers',
  climate: 'Climate',
  other: 'Other',
};

export const deviceClassIcons: Record<string, string> = {
  sensor: '📡',
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
