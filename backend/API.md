# API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication
Most endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### POST /api/auth/register
Register a new client account. **Only clients can register themselves.**

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "client"
    },
    "token": "jwt_token_here"
  },
  "message": "Account created successfully"
}
```

**Note:** Warehouse and admin accounts cannot be created through this endpoint. Admin creates warehouse accounts, and admin has default credentials.

### POST /api/auth/login
Login and get authentication token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "email": "user@example.com",
      "role": "client"
    },
    "token": "jwt_token_here"
  }
}
```

**Default Admin Credentials:**
- Email: `admin@uzalogistics.com`
- Password: `Admin123!`

### POST /api/auth/logout
Logout and invalidate token.

### GET /api/auth/me
Get current authenticated user.

---

## Admin Endpoints

All admin endpoints require `admin` role.

### GET /api/admin/dashboard/stats
Get admin dashboard statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalShipments": 156,
    "activeWarehouses": 12,
    "registeredClients": 89,
    "assistedClients": 23,
    "pendingIssues": 5
  }
}
```

### GET /api/admin/shipments
Get all shipments across all clients.

### GET /api/admin/warehouses
Get all warehouses.

### POST /api/admin/warehouses/create-account
Create a new warehouse account. Admin creates the account and receives credentials to provide to the warehouse.

**Request Body:**
```json
{
  "name": "Central Warehouse",
  "location": "New York, USA",
  "address": "123 Main St",
  "city": "New York",
  "country": "USA",
  "capacity": 5000,
  "pricePerCBM": 25,
  "services": ["Storage", "Handling", "Packaging"],
  "contactName": "John Doe",
  "contactEmail": "warehouse@example.com",
  "contactPhone": "+1234567890",
  "email": "warehouse@example.com",
  "password": "generated_password_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "warehouse": {
      "id": "warehouse_123",
      "name": "Central Warehouse",
      "status": "active",
      ...
    },
    "user": {
      "id": "user_123",
      "email": "warehouse@example.com",
      "password": "generated_password_here"
    }
  },
  "message": "Warehouse account created successfully"
}
```

### POST /api/admin/warehouses/:id/approve
Approve a pending warehouse.

### POST /api/admin/warehouses/:id/suspend
Suspend an active warehouse.

### GET /api/admin/clients
Get all clients with shipment counts.

### GET /api/admin/notifications
Get admin notifications.

---

## Client Endpoints

All client endpoints require `client` role.

### GET /api/client/dashboard/stats
Get client dashboard statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "totalShipments": 12,
    "activeShipments": 5,
    "pendingShipments": 2,
    "completedShipments": 7
  }
}
```

### GET /api/client/shipments
Get all shipments for the authenticated client.

### GET /api/client/shipments/:id
Get specific shipment details.

### POST /api/client/shipments
Create a new shipment.

**Request Body:**
```json
{
  "productName": "Electronics",
  "productCategory": "electronics",
  "quantity": 10,
  "estimatedWeight": 150,
  "estimatedVolume": 2.5,
  "packagingType": "boxes",
  "specialHandling": ["fragile"],
  "pickupCountry": "USA",
  "pickupCity": "New York",
  "pickupAddress": "123 Main St",
  "pickupContactName": "John Doe",
  "pickupContactPhone": "+1234567890",
  "warehouseId": "warehouse_123"
}
```

### GET /api/client/notifications
Get client notifications.

---

## Warehouse Endpoints

All warehouse endpoints require `warehouse` role.

### GET /api/warehouse/dashboard/stats
Get warehouse dashboard statistics.

**Response:**
```json
{
  "success": true,
  "data": {
    "incomingShipments": 12,
    "pendingConfirmations": 5,
    "storageUsed": "75%",
    "activeClients": 28
  }
}
```

### GET /api/warehouse/incoming
Get incoming shipments for the warehouse.

### GET /api/warehouse/shipments/:id
Get specific shipment details.

### POST /api/warehouse/shipments/:id/confirm
Confirm a shipment with actual measurements.

**Request Body:**
```json
{
  "actualWeight": 145,
  "actualVolume": 2.3,
  "notes": "Received in good condition"
}
```

### POST /api/warehouse/shipments/:id/update-status
Update shipment status.

**Request Body:**
```json
{
  "status": "Received at Warehouse",
  "actualWeight": 145,
  "actualVolume": 2.3
}
```

### GET /api/warehouse/notifications
Get warehouse notifications.

---

## Error Responses

All endpoints return errors in the following format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Data Models

### Shipment Status Flow
1. `Waiting for Confirmation` - Initial state after client submission
2. `Confirmed` - Warehouse confirmed the shipment
3. `In Transit to Warehouse` - Shipment is being transported
4. `Received at Warehouse` - Shipment arrived at warehouse
5. `In Transit to Destination` - Shipment being delivered
6. `Delivered` - Shipment completed
7. `Cancelled` - Shipment cancelled

### Warehouse Status
- `pending` - Awaiting admin approval
- `active` - Operational
- `suspended` - Temporarily disabled

---

## Notes

- All timestamps are in ISO 8601 format
- File uploads for product images should use multipart/form-data
- Pagination can be added with `?page=1&limit=10` query parameters
- Filtering and sorting can be added as query parameters
