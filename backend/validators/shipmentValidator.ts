// Example validation schemas using Joi or similar
// Install: npm install joi @types/joi

/*
import Joi from 'joi';

export const createShipmentSchema = Joi.object({
  productName: Joi.string().required().min(1).max(255),
  productCategory: Joi.string().required(),
  productCategoryOther: Joi.string().when('productCategory', {
    is: 'other',
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  quantity: Joi.number().required().min(1),
  estimatedWeight: Joi.number().required().min(0.1),
  estimatedVolume: Joi.number().required().min(0.1),
  packagingType: Joi.string().required().valid('boxes', 'pallets', 'loose'),
  specialHandling: Joi.array().items(Joi.string().valid('fragile', 'liquid', 'hazardous')),
  pickupCountry: Joi.string().required(),
  pickupCity: Joi.string().required(),
  pickupAddress: Joi.string().required(),
  pickupContactName: Joi.string().required(),
  pickupContactPhone: Joi.string().required(),
  warehouseId: Joi.string().required(),
});

export const confirmShipmentSchema = Joi.object({
  actualWeight: Joi.number().required().min(0.1),
  actualVolume: Joi.number().required().min(0.1),
  notes: Joi.string().optional().max(1000),
});

export const updateShipmentStatusSchema = Joi.object({
  status: Joi.string().required().valid(
    'Waiting for Confirmation',
    'Confirmed',
    'In Transit to Warehouse',
    'Received at Warehouse',
    'In Transit to Destination',
    'Delivered',
    'Cancelled'
  ),
  actualWeight: Joi.number().optional().min(0.1),
  actualVolume: Joi.number().optional().min(0.1),
  notes: Joi.string().optional().max(1000),
});
*/

// This is a template - uncomment and install Joi to use

export {};
