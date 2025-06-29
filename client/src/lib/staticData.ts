import type { Device, Document, Alert, ApiKey } from "@shared/schema";
import type { DashboardStats } from "./types";

// Environment detection for static deployments
export const isStaticDeployment = () => {
  return window.location.hostname.includes('github.io') || 
         import.meta.env.VITE_STATIC_MODE === 'true' ||
         true; // Force static mode for demo purposes
};

// Get the correct base path for the current environment
export const getBasePath = () => {
  if (window.location.hostname.includes('github.io')) {
    return '/electrichomehub';
  }
  return '';
};

// Example data for static deployment demonstration
export const exampleDevices: Device[] = [
  {
    id: 1,
    name: "Smart Refrigerator",
    model: "RF28R7351SR",
    manufacturer: "Samsung",
    category: "Kitchen",
    serialNumber: "SR240001234",
    warrantyStatus: "active",
    warrantyExpiry: "2025-12-15",
    location: "Kitchen",
    iconType: "refrigerator"
  },
  {
    id: 2,
    name: "Nest Thermostat",
    model: "T3007ES",
    manufacturer: "Google",
    category: "HVAC",
    serialNumber: "NT350002456",
    warrantyStatus: "expiring_soon", 
    warrantyExpiry: "2025-02-15",
    location: "Living Room",
    iconType: "thermostat"
  },
  {
    id: 3,
    name: "Front Load Washer",
    model: "WF45K6500AV",
    manufacturer: "Samsung",
    category: "Laundry",
    serialNumber: "WM450003789",
    warrantyStatus: "expired",
    warrantyExpiry: "2024-08-10",
    location: "Laundry Room",
    iconType: "washer"
  },
  {
    id: 4,
    name: "Video Doorbell Pro",
    model: "8VD1S7-0EN0",
    manufacturer: "Ring",
    category: "Security",
    serialNumber: "RG880004567",
    warrantyStatus: "expiring_soon",
    warrantyExpiry: "2025-01-30",
    location: "Front Door",
    iconType: "doorbell"
  },
  {
    id: 5,
    name: "Hue Bridge",
    model: "BSB002",
    manufacturer: "Philips",
    category: "Lighting",
    serialNumber: "PH550005890",
    warrantyStatus: "expired",
    warrantyExpiry: "2024-06-15",
    location: "Living Room",
    iconType: "hub"
  },
  {
    id: 6,
    name: "Roomba i7+",
    model: "i755020",
    manufacturer: "iRobot",
    category: "Cleaning",
    serialNumber: "IR770006123",
    warrantyStatus: "active",
    warrantyExpiry: "2025-11-20",
    location: "Living Room",
    iconType: "vacuum"
  }
];

export const exampleDocuments: Document[] = [
  {
    id: 1,
    deviceId: 1,
    name: "Samsung Refrigerator Manual",
    type: "manual",
    category: "User Guide",
    filePath: "/docs/samsung-rf28r7351sr-manual.pdf",
    uploadDate: new Date("2024-01-15")
  },
  {
    id: 2,
    deviceId: 1,
    name: "Samsung Warranty Certificate",
    type: "warranty",
    category: "Warranty",
    filePath: "/docs/samsung-rf28r7351sr-warranty.pdf",
    uploadDate: new Date("2024-01-15")
  },
  {
    id: 3,
    deviceId: 2,
    name: "Nest Installation Guide",
    type: "manual",
    category: "Installation",
    filePath: "/docs/nest-t3007es-install.pdf",
    uploadDate: new Date("2024-02-10")
  },
  {
    id: 4,
    deviceId: 4,
    name: "Ring Setup Instructions",
    type: "manual",
    category: "Setup",
    filePath: "/docs/ring-doorbell-setup.pdf",
    uploadDate: new Date("2024-03-05")
  }
];

export const exampleAlerts: Alert[] = [
  {
    id: 1,
    deviceId: 1,
    type: "recall",
    severity: "critical",
    title: "Firmware Security Update Required",
    description: "Samsung has released a critical security update for your refrigerator. Update within 7 days to maintain secure operation.",
    isRead: false,
    createdAt: new Date("2024-12-25")
  },
  {
    id: 2,
    deviceId: 4,
    type: "maintenance",
    severity: "medium",
    title: "Battery Level Low",
    description: "Your Ring Video Doorbell Pro battery is at 15%. Charge soon to avoid service interruption.",
    isRead: false,
    createdAt: new Date("2024-12-26")
  },
  {
    id: 3,
    deviceId: 6,
    type: "update",
    severity: "low", 
    title: "Software Update Available",
    description: "Roomba i7+ has a new software update with improved navigation and cleaning patterns.",
    isRead: true,
    createdAt: new Date("2024-12-20")
  },
  {
    id: 4,
    deviceId: 2,
    type: "maintenance",
    severity: "medium",
    title: "Filter Replacement Due",
    description: "Your Nest Thermostat's air filter needs replacement. Order a new filter to maintain optimal air quality.",
    isRead: false,
    createdAt: new Date("2024-12-24")
  }
];

export const exampleApiKeys: ApiKey[] = [
  {
    id: 1,
    name: "Production API Key",
    key: "ehh_prod_sk_1234567890abcdef",
    createdAt: new Date("2024-11-15"),
    lastUsed: new Date("2024-12-26")
  },
  {
    id: 2,
    name: "Development API Key", 
    key: "ehh_dev_sk_abcdef1234567890",
    createdAt: new Date("2024-10-01"),
    lastUsed: new Date("2024-12-20")
  }
];

export const exampleStats: DashboardStats = {
  totalDevices: exampleDevices.length,
  activeWarranties: exampleDevices.filter(d => d.warrantyStatus === 'active').length,
  totalDocuments: exampleDocuments.length,
  activeAlerts: exampleAlerts.filter(a => !a.isRead).length
};