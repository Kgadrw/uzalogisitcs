# Backend Architecture

This directory contains the backend architecture for the Uza Logistics application, supporting Admin, Client, and Warehouse dashboards.

## Structure

```
backend/
├── schemas/         # Mongoose database schemas
├── models/          # Database model wrappers
├── controllers/     # Request handlers
├── services/        # Business logic
├── routes/          # API route definitions
├── middleware/      # Auth, validation, error handling
├── types/           # TypeScript types and interfaces
├── utils/           # Utility functions
├── config/          # Configuration files
└── validators/      # Input validation schemas
```

## Features

### Admin Dashboard
- Manage all shipments
- Warehouse management (approve, suspend, view)
- Client management
- Statistics and analytics
- Notifications
- Assisted client shipments
- Pricing management

### Client Dashboard
- Create and manage shipments
- Track shipment status
- View shipment history
- Cost estimation
- Notifications

### Warehouse Dashboard
- View incoming shipments
- Confirm shipments
- Update shipment status
- View statistics
- Notifications

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Admin Routes
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/shipments` - Get all shipments
- `GET /api/admin/warehouses` - Get all warehouses
- `POST /api/admin/warehouses/:id/approve` - Approve warehouse
- `POST /api/admin/warehouses/:id/suspend` - Suspend warehouse
- `GET /api/admin/clients` - Get all clients
- `GET /api/admin/notifications` - Get admin notifications

### Client Routes
- `GET /api/client/dashboard/stats` - Client dashboard stats
- `GET /api/client/shipments` - Get client shipments
- `POST /api/client/shipments` - Create new shipment
- `GET /api/client/shipments/:id` - Get shipment details
- `GET /api/client/notifications` - Get client notifications

### Warehouse Routes
- `GET /api/warehouse/dashboard/stats` - Warehouse dashboard stats
- `GET /api/warehouse/incoming` - Get incoming shipments
- `GET /api/warehouse/shipments/:id` - Get shipment details
- `POST /api/warehouse/shipments/:id/confirm` - Confirm shipment
- `POST /api/warehouse/shipments/:id/update-status` - Update shipment status
- `GET /api/warehouse/notifications` - Get warehouse notifications

## Database Models

- **User**: Authentication and user information
- **Shipment**: Shipment details and status
- **Warehouse**: Warehouse information
- **Client**: Client information
- **Notification**: System notifications
- **Pricing**: Pricing rules and rates

## MongoDB Setup

The backend is configured to use MongoDB Atlas with Mongoose. The connection string is already configured in `config/database.ts`.

### Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file (optional, connection string is already configured):
```env
MONGODB_URI=mongodb+srv://kalisagad05_db_user:SKLX1W7tTh5BmK50@cluster0.anfwvi8.mongodb.net/uzalogistics?retryWrites=true&w=majority&appName=Cluster0
PORT=3001
NODE_ENV=development
```

3. Run the server:
```bash
npm run dev
```

The server will automatically connect to MongoDB on startup. All database schemas are defined in `backend/schemas/` directory.

## Authentication

Uses JWT tokens for authentication. Middleware validates tokens and checks user roles.

### Account Creation

- **Clients**: Can create their own accounts via `/auth/register`
- **Warehouses**: Created by admin only (via admin dashboard)
- **Admin**: Default account is automatically created on server startup

### Default Admin Credentials

When the server starts for the first time, a default admin account is created:
- **Email**: `admin@uzalogistics.com`
- **Password**: `Admin123!`

⚠️ **Important**: Change the default admin password after first login!

## Error Handling

Standardized error responses with appropriate HTTP status codes.
