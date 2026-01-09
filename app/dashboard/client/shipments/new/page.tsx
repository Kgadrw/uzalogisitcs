'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import StepForm from '@/components/StepForm';
import Card from '@/components/Card';
import { formatCurrency } from '@/lib/utils';
import { HiOutlineCheckCircle } from 'react-icons/hi2';

export default function NewShipmentPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    // Step 1: Goods Details
    productName: '',
    productCategory: '',
    quantity: '',
    estimatedWeight: '',
    estimatedVolume: '',
    packagingType: '',
    specialHandling: [] as string[],
    
    // Step 2: Location
    country: '',
    city: '',
    fullAddress: '',
    contactPersonName: '',
    contactPhoneNumber: '',
    
    // Step 3: Warehouse
    selectedWarehouse: null as any,
  });

  const warehouses = [
    {
      id: '1',
      name: 'Central Warehouse',
      location: 'New York, USA',
      capacity: '5000 CBM available',
      pricePerCBM: 25,
      services: ['Storage', 'Handling', 'Packaging'],
      rating: 4.8,
    },
    {
      id: '2',
      name: 'East Coast Hub',
      location: 'Boston, USA',
      capacity: '3000 CBM available',
      pricePerCBM: 30,
      services: ['Storage', 'Handling'],
      rating: 4.6,
    },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    setFormData((prev) => {
      const handling = [...prev.specialHandling];
      if (checked) {
        handling.push(value);
      } else {
        const index = handling.indexOf(value);
        if (index > -1) handling.splice(index, 1);
      }
      return { ...prev, specialHandling: handling };
    });
  };

  const calculateCost = () => {
    const weight = parseFloat(formData.estimatedWeight) || 0;
    const volume = parseFloat(formData.estimatedVolume) || 0;
    const transportFee = weight * 0.5; // $0.5 per kg
    const storageFee = volume * (formData.selectedWarehouse?.pricePerCBM || 0);
    const handlingFee = 50;
    return {
      transportFee,
      storageFee,
      handlingFee,
      total: transportFee + storageFee + handlingFee,
    };
  };

  const handleSubmit = () => {
    // Mock submission - replace with API call
    console.log('Submitting shipment:', formData);
    alert('Shipment submitted successfully!');
    router.push('/dashboard/client/shipments');
  };

  const step1 = (
    <Card>
      <h3 className="text-primary text-xl mb-4">Goods Information</h3>
      <div className="space-y-4">
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
        
        <div className="grid grid-cols-2 gap-4">
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
        
        <div>
          <label className="block text-primary mb-2">Packaging Type</label>
          <select
            value={formData.packagingType}
            onChange={(e) => handleInputChange('packagingType', e.target.value)}
            className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
            required
          >
            <option value="">Select type</option>
            <option value="boxes">Boxes</option>
            <option value="pallets">Pallets</option>
            <option value="loose">Loose</option>
          </select>
        </div>
        
        <div>
          <label className="block text-primary mb-2">Special Handling</label>
          <div className="space-y-2">
            {['Fragile', 'Liquid', 'Hazardous'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.specialHandling.includes(type.toLowerCase())}
                  onChange={(e) => handleCheckboxChange(type.toLowerCase(), e.target.checked)}
                  className="mr-2"
                />
                <span className="text-primary">{type}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );

  const step2 = (
    <Card>
      <h3 className="text-primary text-xl mb-4">Pickup Location</h3>
      <div className="space-y-4">
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
        </div>
        
        <div>
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
          <label className="block text-primary mb-2">Map Location Picker</label>
          <div className="border border-primary border-opacity-20 p-8 text-center text-primary text-opacity-50">
            Map integration placeholder
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
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
    </Card>
  );

  const step3 = (
    <Card>
      <h3 className="text-primary text-xl mb-4">Select Warehouse</h3>
      <div className="space-y-4">
        {warehouses.map((warehouse) => (
          <div
            key={warehouse.id}
            className={`border border-primary border-opacity-20 p-4 cursor-pointer ${
              formData.selectedWarehouse?.id === warehouse.id
                ? 'border-primary'
                : 'hover:border-primary hover:border-opacity-50'
            }`}
            onClick={() => handleInputChange('selectedWarehouse', warehouse)}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-primary text-lg">{warehouse.name}</h4>
                <p className="text-primary text-opacity-70">{warehouse.location}</p>
              </div>
              <div className="text-primary">Rating: {warehouse.rating}</div>
            </div>
            <div className="mt-2 space-y-1">
              <p className="text-primary text-sm">Available Storage: {warehouse.capacity}</p>
              <p className="text-primary text-sm">Price per CBM: {formatCurrency(warehouse.pricePerCBM)}</p>
              <p className="text-primary text-sm">Services: {warehouse.services.join(', ')}</p>
            </div>
            <button
              className="mt-4 flex items-center gap-2 px-4 py-2 bg-primary text-secondary hover:bg-opacity-90"
              onClick={(e) => {
                e.stopPropagation();
                handleInputChange('selectedWarehouse', warehouse);
              }}
            >
              <HiOutlineCheckCircle className="w-4 h-4 text-blue-500" />
              <span>Select Warehouse</span>
            </button>
          </div>
        ))}
      </div>
    </Card>
  );

  const step4 = (
    <Card>
      <h3 className="text-primary text-xl mb-4">Cost Summary</h3>
      {formData.selectedWarehouse ? (
        <>
          <div className="space-y-3 mb-6">
            {(() => {
              const costs = calculateCost();
              return (
                <>
                  <div className="flex justify-between text-primary">
                    <span>Transport Fee (Pickup → Warehouse)</span>
                    <span>{formatCurrency(costs.transportFee)}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Storage Fee (per CBM)</span>
                    <span>{formatCurrency(costs.storageFee)}</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Handling Fee</span>
                    <span>{formatCurrency(costs.handlingFee)}</span>
                  </div>
                  <div className="border-t border-primary border-opacity-20 pt-3 mt-3">
                    <div className="flex justify-between text-primary text-xl">
                      <span>Estimated Total Cost</span>
                      <span>{formatCurrency(costs.total)}</span>
                    </div>
                  </div>
                </>
              );
            })()}
          </div>
          
          <div className="bg-primary bg-opacity-5 p-4 mb-6">
            <p className="text-primary text-sm">
              Final cost may change after warehouse confirms actual weight and volume.
            </p>
          </div>
        </>
      ) : (
        <p className="text-primary text-opacity-70">Please select a warehouse first.</p>
      )}
    </Card>
  );

  return (
    <div>
      <StepForm
        steps={[
          { title: 'Goods Details', component: step1 },
          { title: 'Location', component: step2 },
          { title: 'Warehouse', component: step3 },
          { title: 'Summary', component: step4 },
        ]}
        onSubmit={handleSubmit}
        submitLabel="Confirm and Submit Shipment"
      />
    </div>
  );
}

