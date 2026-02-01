export type DeviceClass =
  | 'light'
  | 'plug'
  | 'switch'
  | 'lock'
  | 'thermostat'
  | 'camera'
  | 'hub'
  | 'bridge'
  | 'blind'
  | 'speaker'
  | 'climate'
  | 'remote'
  | 'temperature_sensor'
  | 'motion_sensor'
  | 'water_leak_sensor'
  | 'contact_sensor'
  | 'light_sensor'
  | 'air_quality_sensor'
  | 'other';

export type Protocol = 'Matter' | 'Thread' | 'Zigbee' | 'Z-Wave' | 'WiFi' | 'Bluetooth';

export type PowerSupply = 'mains' | 'battery' | 'poe' | 'usb';

export interface Device {
  id: string;
  name: string;
  manufacturer_id: string;
  device_class: DeviceClass;
  protocols: Protocol[];
  releaseDate?: string;
  powerSupply?: PowerSupply;
  supportsOTA?: boolean;
  features?: string[];
  imageUrl?: string;
  meta?: {
    last_updated?: string;
  };
}

export interface Manufacturer {
  id: string;
  name: string;
  website?: string;
  logo?: string;
}

export interface FilterState {
  search: string;
  manufacturer: string;
  device_class: DeviceClass;
  powerSupply: string;
}
