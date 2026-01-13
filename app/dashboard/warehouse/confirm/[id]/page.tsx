'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import StatusBadge from '@/components/StatusBadge';
import { HiOutlineXMark, HiOutlineCheck } from 'react-icons/hi2';
import { useToast } from '@/contexts/ToastContext';

export default function ConfirmGoodsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { showSuccess } = useToast();
  
  const [formData, setFormData] = useState({
    actualWeight: '',
    actualVolume: '',
    goodsCondition: '',
    notes: '',
    status: 'Received at Warehouse', // Default status
  });

  // Mock shipment data - replace with API call
  const shipment = {
    id,
    clientName: 'John Doe',
    productName: 'Electronics',
    estimatedWeight: 150,
    estimatedCBM: 2.5,
    currentStatus: 'In Transit to Warehouse', // Current status from database
  };

  const statusOptions = [
    'Waiting for Confirmation',
    'In Transit to Warehouse',
    'Received at Warehouse',
    'Confirmed',
    'In Transit',
    'Delivered',
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - replace with API call
    console.log('Updating shipment status:', { 
      shipmentId: id, 
      ...formData 
    });
    showSuccess(`Shipment status updated to "${formData.status}" and client notified!`);
    router.push('/dashboard/warehouse/incoming');
  };

  return (
    <div>
      
      <Card>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-primary text-lg font-semibold">Shipment Information</h3>
            <div className="flex items-center gap-2">
              <span className="text-primary text-sm text-opacity-70">Current Status:</span>
              <StatusBadge status={shipment.currentStatus} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-primary text-opacity-70">Client Name</span>
              <span className="text-primary font-semibold">{shipment.clientName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary text-opacity-70">Product Name</span>
              <span className="text-primary font-semibold">{shipment.productName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary text-opacity-70">Estimated Weight</span>
              <span className="text-primary font-semibold">{shipment.estimatedWeight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary text-opacity-70">Estimated CBM</span>
              <span className="text-primary font-semibold">{shipment.estimatedCBM}</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-primary mb-2">Update Shipment Status</label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <p className="text-primary text-sm text-opacity-70 mt-2">
              This status will be visible to the client
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-primary mb-2">Actual Weight (kg)</label>
              <input
                type="number"
                value={formData.actualWeight}
                onChange={(e) => handleInputChange('actualWeight', e.target.value)}
                className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                required
              />
            </div>
            
            <div>
              <label className="block text-primary mb-2">Actual Volume (CBM)</label>
              <input
                type="number"
                step="0.1"
                value={formData.actualVolume}
                onChange={(e) => handleInputChange('actualVolume', e.target.value)}
                className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                required
              />
            </div>
          </div>
          
          <div>
            <label className="block text-primary mb-2">Goods Condition</label>
            <select
              value={formData.goodsCondition}
              onChange={(e) => handleInputChange('goodsCondition', e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
            >
              <option value="">Select condition</option>
              <option value="good">Good</option>
              <option value="damaged">Damaged</option>
            </select>
          </div>
          
          <div>
            <label className="block text-primary mb-2">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              rows={4}
            />
          </div>
          
          <div>
            <label className="block text-primary mb-2">Upload Photos</label>
            <div className="border border-primary border-opacity-20 border-dashed p-8 text-center text-primary text-opacity-50">
              Photo upload placeholder
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex items-center gap-2 px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-secondary"
            >
              <HiOutlineXMark className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-primary text-secondary hover:bg-opacity-90"
            >
              <HiOutlineCheck className="w-4 h-4 text-blue-500" />
              <span>Confirm and Notify Client</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

