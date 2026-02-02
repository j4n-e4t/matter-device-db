export type Capability =
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
  | 'temperature'
  | 'humidity'
  | 'motion'
  | 'water_leak'
  | 'contact'
  | 'brightness'
  | 'air_quality'
  | 'other';

export type Protocol = 'Matter' | 'Thread' | 'Zigbee' | 'Z-Wave' | 'WiFi' | 'Bluetooth';

export type PowerSupply = 'mains' | 'battery' | 'poe' | 'usb';

export interface Device {
  id: string;
  name: string;
  manufacturer_id: string;
  capabilities: Capability[];
  protocols: Protocol[];
  releaseDate?: string;
  powerSupply?: PowerSupply;
  supportsOTA?: boolean;
  features?: string[];
  imageUrl?: string;
  contributors?: string[];
  meta?: {
    last_updated?: string;
  };
}

export interface Manufacturer {
  id: string;
  name: string;
  website?: string;
  logo?: string;
  contributors?: string[];
}

export interface FilterState {
  search: string;
  manufacturer: string;
  capability: Capability;
  powerSupply: string;
}
