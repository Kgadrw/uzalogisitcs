import { Router } from 'express';
import { AdminController } from '../controllers/adminController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireAdmin);

// Dashboard
router.get('/dashboard/stats', AdminController.getDashboardStats);

// Shipments
router.get('/shipments', AdminController.getAllShipments);

// Warehouses
router.get('/warehouses', AdminController.getAllWarehouses);
router.post('/warehouses/create-account', AdminController.createWarehouseAccount);
router.post('/warehouses/:id/approve', AdminController.approveWarehouse);
router.post('/warehouses/:id/suspend', AdminController.suspendWarehouse);

// Clients
router.get('/clients', AdminController.getAllClients);

// Notifications
router.get('/notifications', AdminController.getNotifications);

export default router;
