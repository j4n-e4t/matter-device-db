export type DeviceClass =
  | 'sensor'
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
