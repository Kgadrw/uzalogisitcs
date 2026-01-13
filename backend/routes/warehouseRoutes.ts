import { Router } from 'express';
import { WarehouseController } from '../controllers/warehouseController';
import { authenticate, requireWarehouse } from '../middleware/auth';

const router = Router();

// All warehouse routes require authentication and warehouse role
router.use(authenticate);
router.use(requireWarehouse);

// Dashboard
router.get('/dashboard/stats', WarehouseController.getDashboardStats);

// Shipments
router.get('/incoming', WarehouseController.getIncomingShipments);
router.get('/shipments/:id', WarehouseController.getShipmentById);
router.post('/shipments/:id/confirm', WarehouseController.confirmShipment);
router.post('/shipments/:id/update-status', WarehouseController.updateShipmentStatus);

// Notifications
router.get('/notifications', WarehouseController.getNotifications);

export default router;
