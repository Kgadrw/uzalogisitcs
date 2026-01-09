'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Table, { TableRow, TableCell } from '@/components/Table';
import { HiX, HiCheck, HiPlusCircle, HiEye } from 'react-icons/hi';
import { formatDate } from '@/lib/utils';

// Mock data - replace with API call
const assistedDeliveries = [
  {
    id: '1',
    clientName: 'Sarah Johnson',
    phoneNumber: '+1 234-567-8900',
    productName: 'Electronics',
    status: 'Confirmed',
    createdDate: new Date('2024-01-15'),
    warehouse: 'Central Warehouse',
  },
  {
    id: '2',
    clientName: 'Michael Chen',
    phoneNumber: '+1 234-567-8901',
    productName: 'Furniture',
    status: 'In Transit',
    createdDate: new Date('2024-01-20'),
    warehouse: 'East Coast Hub',
  },
  {
    id: '3',
    clientName: 'Emily Davis',
    phoneNumber: '+1 234-567-8902',
    productName: 'Clothing',
    status: 'Pending',
    createdDate: new Date('2024-01-22'),
    warehouse: 'Central Warehouse',
  },
];

export default function AssistedDeliveryPage() {
  const router = useRouter();
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const [formData, setFormData] = useState({
    clientName: '',
    phoneNumber: '',
    productName: '',
    productCategory: '',
    quantity: '',
    estimatedWeight: '',
    estimatedVolume: '',
    country: '',
    city: '',
    fullAddress: '',
    contactPersonName: '',
    contactPhoneNumber: '',
    selectedWarehouse: '',
  });

  const warehouses = [
    { id: '1', name: 'Central Warehouse', location: 'New York, USA' },
    { id: '2', name: 'East Coast Hub', location: 'Boston, USA' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission - replace with API call
    console.log('Creating assisted shipment:', formData);
    alert('Shipment created successfully! Client will receive updates via SMS/Email.');
    setShowCreateForm(false);
    // Reset form
    setFormData({
      clientName: '',
      phoneNumber: '',
      productName: '',
      productCategory: '',
      quantity: '',
      estimatedWeight: '',
      estimatedVolume: '',
      country: '',
      city: '',
      fullAddress: '',
      contactPersonName: '',
      contactPhoneNumber: '',
      selectedWarehouse: '',
    });
  };

  if (showCreateForm) {
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setShowCreateForm(false)}
            className="flex items-center gap-2 px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-secondary"
          >
            <HiX className="w-4 h-4" />
            <span>Back to List</span>
          </button>
        </div>
        
        <Card>
        <p className="text-primary text-opacity-70 mb-6">
          Create a shipment on behalf of a client who does not have an account. 
          The client will receive updates via SMS or Email.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-primary text-lg mb-4">Client Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-primary mb-2">Client Name</label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => handleInputChange('clientName', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-primary mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-primary text-lg mb-4">Product Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-primary mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.productName}
                  onChange={(e) => handleInputChange('productName', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-primary mb-2">Product Category</label>
                <select
                  value={formData.productCategory}
                  onChange={(e) => handleInputChange('productCategory', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  required
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="clothing">Clothing</option>
                  <option value="food">Food</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-primary mb-2">Quantity</label>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-primary mb-2">Estimated Weight (kg)</label>
                <input
                  type="number"
                  value={formData.estimatedWeight}
                  onChange={(e) => handleInputChange('estimatedWeight', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-primary mb-2">Estimated Volume (CBM)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.estimatedVolume}
                  onChange={(e) => handleInputChange('estimatedVolume', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-primary text-lg mb-4">Pickup Location</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-primary mb-2">Country</label>
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  required
                >
                  <option value="">Select country</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                  <option value="canada">Canada</option>
                </select>
              </div>
              
              <div>
                <label className="block text-primary mb-2">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  required
                />
              </div>
              
              <div className="col-span-2">
                <label className="block text-primary mb-2">Full Address</label>
                <textarea
                  value={formData.fullAddress}
                  onChange={(e) => handleInputChange('fullAddress', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-primary mb-2">Contact Person Name</label>
                <input
                  type="text"
                  value={formData.contactPersonName}
                  onChange={(e) => handleInputChange('contactPersonName', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-primary mb-2">Contact Phone Number</label>
                <input
                  type="tel"
                  value={formData.contactPhoneNumber}
                  onChange={(e) => handleInputChange('contactPhoneNumber', e.target.value)}
                  className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                  required
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-primary text-lg mb-4">Warehouse Selection</h3>
            <div>
              <label className="block text-primary mb-2">Select Warehouse</label>
              <select
                value={formData.selectedWarehouse}
                onChange={(e) => handleInputChange('selectedWarehouse', e.target.value)}
                className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                required
              >
                <option value="">Select warehouse</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name} - {warehouse.location}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => setShowCreateForm(false)}
              className="flex items-center gap-2 px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-secondary"
            >
              <HiX className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-primary text-secondary hover:bg-opacity-90"
            >
              <HiCheck className="w-4 h-4 text-blue-500" />
              <span>Create Shipment</span>
            </button>
          </div>
        </form>
      </Card>
    </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-secondary hover:bg-opacity-90"
        >
          <HiPlusCircle className="w-5 h-5" />
          <span>Create New Assisted Delivery</span>
        </button>
      </div>
      
      <Card>
        <h3 className="text-primary text-xl mb-4">Previous Assisted Deliveries</h3>
        <Table headers={['Client Name', 'Phone Number', 'Product Name', 'Warehouse', 'Status', 'Created Date', 'Action']}>
          {assistedDeliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell>{delivery.clientName}</TableCell>
              <TableCell>{delivery.phoneNumber}</TableCell>
              <TableCell>{delivery.productName}</TableCell>
              <TableCell>{delivery.warehouse}</TableCell>
              <TableCell>{delivery.status}</TableCell>
              <TableCell>{formatDate(delivery.createdDate)}</TableCell>
              <TableCell>
                <button
                  onClick={() => {
                    // Handle view details
                    console.log('View delivery:', delivery.id);
                  }}
                  className="flex items-center gap-1 text-primary underline hover:text-opacity-70"
                >
                  <HiEye className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}

