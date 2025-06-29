import { 
  devices, documents, alerts, apiKeys,
  type Device, type InsertDevice,
  type Document, type InsertDocument,
  type Alert, type InsertAlert,
  type ApiKey, type InsertApiKey
} from "@shared/schema";

export interface IStorage {
  // Devices
  getDevices(): Promise<Device[]>;
  getDevice(id: number): Promise<Device | undefined>;
  createDevice(device: InsertDevice): Promise<Device>;
  updateDevice(id: number, device: Partial<InsertDevice>): Promise<Device | undefined>;
  deleteDevice(id: number): Promise<boolean>;
  
  // Documents
  getDocuments(): Promise<Document[]>;
  getDocumentsByDevice(deviceId: number): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  deleteDocument(id: number): Promise<boolean>;
  
  // Alerts
  getAlerts(): Promise<Alert[]>;
  getUnreadAlerts(): Promise<Alert[]>;
  createAlert(alert: InsertAlert): Promise<Alert>;
  markAlertAsRead(id: number): Promise<boolean>;
  
  // API Keys
  getApiKeys(): Promise<ApiKey[]>;
  createApiKey(apiKey: InsertApiKey): Promise<ApiKey>;
  deleteApiKey(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private devices: Map<number, Device>;
  private documents: Map<number, Document>;
  private alerts: Map<number, Alert>;
  private apiKeys: Map<number, ApiKey>;
  private currentDeviceId: number;
  private currentDocumentId: number;
  private currentAlertId: number;
  private currentApiKeyId: number;

  constructor() {
    this.devices = new Map();
    this.documents = new Map();
    this.alerts = new Map();
    this.apiKeys = new Map();
    this.currentDeviceId = 1;
    this.currentDocumentId = 1;
    this.currentAlertId = 1;
    this.currentApiKeyId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed devices with consistent warranty status values
    const sampleDevices: InsertDevice[] = [
      {
        name: "Smart Fridge",
        model: "RF28R7351",
        manufacturer: "Samsung",
        category: "Kitchen",
        serialNumber: "SR240001234",
        warrantyStatus: "active",
        warrantyExpiry: "2025-12-15",
        location: "Kitchen",
        iconType: "refrigerator"
      },
      {
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

    sampleDevices.forEach(device => {
      this.createDevice(device);
    });

    // Seed alerts
    const sampleAlerts: InsertAlert[] = [
      {
        deviceId: 1,
        type: "recall",
        severity: "critical",
        title: "Critical: Samsung Refrigerator Recall",
        description: "RF28R7351 models manufactured between Jan-Mar 2023 have a potential ice maker defect. Contact support immediately."
      },
      {
        deviceId: 2,
        type: "firmware",
        severity: "warning",
        title: "Warning: Nest Thermostat Firmware Update",
        description: "New firmware available that addresses connectivity issues. Update recommended within 30 days."
      },
      {
        deviceId: 3,
        type: "maintenance",
        severity: "info",
        title: "Info: Philips Hue Bridge Maintenance",
        description: "Scheduled maintenance window planned for next Tuesday 2-4 AM EST. No action required."
      }
    ];

    sampleAlerts.forEach(alert => {
      this.createAlert(alert);
    });
  }

  // Device methods
  async getDevices(): Promise<Device[]> {
    return Array.from(this.devices.values());
  }

  async getDevice(id: number): Promise<Device | undefined> {
    return this.devices.get(id);
  }

  async createDevice(insertDevice: InsertDevice): Promise<Device> {
    const id = this.currentDeviceId++;
    const device: Device = { ...insertDevice, id };
    this.devices.set(id, device);
    return device;
  }

  async updateDevice(id: number, updates: Partial<InsertDevice>): Promise<Device | undefined> {
    const device = this.devices.get(id);
    if (!device) return undefined;
    
    const updatedDevice = { ...device, ...updates };
    this.devices.set(id, updatedDevice);
    return updatedDevice;
  }

  async deleteDevice(id: number): Promise<boolean> {
    return this.devices.delete(id);
  }

  // Document methods
  async getDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }

  async getDocumentsByDevice(deviceId: number): Promise<Document[]> {
    return Array.from(this.documents.values()).filter(doc => doc.deviceId === deviceId);
  }

  async createDocument(insertDocument: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const document: Document = { 
      ...insertDocument, 
      id,
      uploadDate: new Date()
    };
    this.documents.set(id, document);
    return document;
  }

  async deleteDocument(id: number): Promise<boolean> {
    return this.documents.delete(id);
  }

  // Alert methods
  async getAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getUnreadAlerts(): Promise<Alert[]> {
    return Array.from(this.alerts.values()).filter(alert => !alert.isRead);
  }

  async createAlert(insertAlert: InsertAlert): Promise<Alert> {
    const id = this.currentAlertId++;
    const alert: Alert = { 
      ...insertAlert, 
      id,
      isRead: false,
      createdAt: new Date()
    };
    this.alerts.set(id, alert);
    return alert;
  }

  async markAlertAsRead(id: number): Promise<boolean> {
    const alert = this.alerts.get(id);
    if (!alert) return false;
    
    const updatedAlert = { ...alert, isRead: true };
    this.alerts.set(id, updatedAlert);
    return true;
  }

  // API Key methods
  async getApiKeys(): Promise<ApiKey[]> {
    return Array.from(this.apiKeys.values());
  }

  async createApiKey(insertApiKey: InsertApiKey): Promise<ApiKey> {
    const id = this.currentApiKeyId++;
    const apiKey: ApiKey = { 
      ...insertApiKey, 
      id,
      createdAt: new Date(),
      lastUsed: null
    };
    this.apiKeys.set(id, apiKey);
    return apiKey;
  }

  async deleteApiKey(id: number): Promise<boolean> {
    return this.apiKeys.delete(id);
  }
}

export const storage = new MemStorage();
