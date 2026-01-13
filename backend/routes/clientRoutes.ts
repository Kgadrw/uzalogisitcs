import { Router } from 'express';
import { ClientController } from '../controllers/clientController';
import { authenticate, requireClient } from '../middleware/auth';

const router = Router();

// All client routes require authentication and client role
router.use(authenticate);
router.use(requireClient);

// Dashboard
router.get('/dashboard/stats', ClientController.getDashboardStats);

// Shipments
router.get('/shipments', ClientController.getShipments);
router.get('/shipments/:id', ClientController.getShipmentById);
router.post('/shipments', ClientController.createShipment);

// Notifications
router.get('/notifications', ClientController.getNotifications);

export default router;
