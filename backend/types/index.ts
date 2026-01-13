// User Types
export type UserRole = 'client' | 'warehouse' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  password?: string; // Hashed password, never returned in responses
  createdAt: Date;
  updatedAt: Date;
}

export interface Client extends User {
  role: 'client';
  shipmentsCount?: number;
  status: 'active' | 'inactive';
}

export interface WarehouseUser extends User {
  role: 'warehouse';
  warehouseId: string;
}

export interface AdminUser extends User {
  role: 'admin';
}

// Shipment Types
export type ShipmentStatus = 
  | 'Waiting for Confirmation'
  | 'Confirmed'
  | 'In Transit to Warehouse'
  | 'Received at Warehouse'
  | 'In Transit to Destination'
  | 'Delivered'
  | 'Cancelled';

export interface Shipment {
  id: string;
  clientId: string;
  warehouseId: string | null;
  productName: string;
  productCategory: string;
  productCategoryOther?: string;
  quantity: number;
  estimatedWeight: number; // kg
  estimatedVolume: number; // CBM
  actualWeight?: number;
  actualVolume?: number;
  packagingType: string;
  specialHandling: string[];
  productImages: string[]; // URLs or file paths
  status: ShipmentStatus;
  
  // Location
  pickupCountry: string;
  pickupCity: string;
  pickupAddress: string;
  pickupContactName: string;
  pickupContactPhone: string;
  pickupCoordinates?: {
    lat: number;
    lng: number;
  };
  
  // Pricing
  transportFee: number;
  storageFee: number;
  handlingFee: number;
  totalCost: number;
  finalCost?: number;
  
  // Timestamps
  submittedDate: Date;
  confirmedDate?: Date;
  receivedDate?: Date;
  deliveredDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Warehouse Types
export type WarehouseStatus = 'active' | 'pending' | 'suspended';

export interface Warehouse {
  id: string;
  name: string;
  location: string;
  address: string;
  city: string;
  country: string;
  capacity: number; // Total CBM
  usedCapacity: number; // Used CBM
  pricePerCBM: number;
  services: string[];
  rating: number;
  status: WarehouseStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Notification Types
export type NotificationType = 
  | 'system_alert'
  | 'shipment_update'
  | 'new_shipping'
  | 'warehouse_alert'
  | 'cost_adjustment';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  message: string;
  isRead: boolean;
  relatedId?: string; // shipmentId, warehouseId, etc.
  metadata?: Record<string, any>;
  createdAt: Date;
}

// Dashboard Stats Types
export interface AdminDashboardStats {
  totalShipments: number;
  activeWarehouses: number;
  registeredClients: number;
  assistedClients: number;
  pendingIssues: number;
}

export interface ClientDashboardStats {
  totalShipments: number;
  activeShipments: number;
  pendingShipments: number;
  completedShipments: number;
}

export interface WarehouseDashboardStats {
  incomingShipments: number;
  pendingConfirmations: number;
  storageUsed: string; // Percentage
  activeClients: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Request Types
export interface CreateShipmentRequest {
  productName: string;
  productCategory: string;
  productCategoryOther?: string;
  quantity: number;
  estimatedWeight: number;
  estimatedVolume: number;
  packagingType: string;
  specialHandling: string[];
  productImages: File[];
  pickupCountry: string;
  pickupCity: string;
  pickupAddress: string;
  pickupContactName: string;
  pickupContactPhone: string;
  warehouseId: string;
}

export interface CreateWarehouseAccountRequest {
  name: string;
  location: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  pricePerCBM: number;
  services: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  email: string; // Login email
  password: string; // Generated password
}

export interface WarehouseAccountResponse {
  warehouse: Warehouse;
  user: {
    id: string;
    email: string;
    password: string; // Only returned once during creation
  };
}

export interface UpdateShipmentStatusRequest {
  status: ShipmentStatus;
  actualWeight?: number;
  actualVolume?: number;
  notes?: string;
}

export interface ConfirmShipmentRequest {
  actualWeight: number;
  actualVolume: number;
  notes?: string;
}
