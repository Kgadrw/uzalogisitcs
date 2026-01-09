# Uza Logistics - Role-Specific Routes

## ⚠️ Security Note
Each role has their own dedicated login URL. Users should only be given access to their specific login URL.

## Authentication Routes

### Role-Specific Login Pages (Direct Access Only)
- `/auth/login/client` - **CLIENT LOGIN** - Only for clients
- `/auth/login/warehouse` - **WAREHOUSE LOGIN** - Only for warehouse partners  
- `/auth/login/admin` - **ADMIN LOGIN** - Only for administrators

**Note:** `/auth/login` redirects to client login (default). Each role should use their specific login URL.

## Dashboard Routes

### Client Dashboard Routes
- `/dashboard/client` - Client dashboard (main)
- `/dashboard/client/shipments` - View all client shipments
- `/dashboard/client/shipments/new` - Create new shipment
- `/dashboard/client/shipments/[id]` - View shipment details (dynamic route)

### Warehouse Dashboard Routes
- `/dashboard/warehouse` - Warehouse dashboard (main)
- `/dashboard/warehouse/incoming` - View incoming shipments
- `/dashboard/warehouse/confirm/[id]` - Confirm goods received (dynamic route)

### Admin Dashboard Routes
- `/dashboard/admin` - Admin dashboard (main)
- `/dashboard/admin/clients` - Client management
- `/dashboard/admin/warehouses` - Warehouse management
- `/dashboard/admin/shipments` - View all shipments
- `/dashboard/admin/assisted` - Assisted delivery management

## Root Route
- `/` - Home page (redirects based on user role or to login selection)

## Example Direct URL Access

You can directly access any of these routes by typing them in your browser:

**Client Login:**
```
http://localhost:3000/auth/login/client
```

**Client Dashboard:**
```
http://localhost:3000/dashboard/client
```

**Create Shipment:**
```
http://localhost:3000/dashboard/client/shipments/new
```

**Warehouse Login:**
```
http://localhost:3000/auth/login/warehouse
```

**Warehouse Dashboard:**
```
http://localhost:3000/dashboard/warehouse
```

**Admin Login:**
```
http://localhost:3000/auth/login/admin
```

**Admin Dashboard:**
```
http://localhost:3000/dashboard/admin
```

**View Specific Shipment:**
```
http://localhost:3000/dashboard/client/shipments/1
```

**Confirm Goods:**
```
http://localhost:3000/dashboard/warehouse/confirm/1
```

