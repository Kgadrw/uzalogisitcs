'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import StepForm from '@/components/StepForm';
import Card from '@/components/Card';
import { formatCurrency } from '@/lib/utils';
import { HiOutlineCheckCircle, HiOutlineXMark, HiOutlinePhoto } from 'react-icons/hi2';
import { useToast } from '@/contexts/ToastContext';

export default function NewShipmentPage() {
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    // Step 1: Goods Details
    productName: '',
    productCategory: '',
    productCategoryOther: '', // For "Other" category specification
    quantity: '',
    estimatedWeight: '',
    estimatedVolume: '',
    packagingType: '',
    specialHandling: [] as string[],
    productImages: [] as File[],
    
    // Step 2: Location
    country: '',
    city: '',
    fullAddress: '',
    contactPersonName: '',
    contactPhoneNumber: '',
    
    // Step 3: Warehouse
    selectedWarehouse: null as any,
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages = [...formData.productImages, ...files];
      setFormData((prev) => ({ ...prev, productImages: newImages }));

      // Create previews
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setImagePreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = formData.productImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    
    // Revoke object URL to free memory
    URL.revokeObjectURL(imagePreviews[index]);
    
    setFormData((prev) => ({ ...prev, productImages: newImages }));
    setImagePreviews(newPreviews);
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
    console.log('Submitting shipment:', {
      ...formData,
      productImages: formData.productImages.map((file, index) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      })),
    });
    
    // Clean up object URLs
    imagePreviews.forEach(url => URL.revokeObjectURL(url));
    
    showSuccess('Shipment submitted successfully!');
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
            onChange={(e) => {
              handleInputChange('productCategory', e.target.value);
              // Clear other category field if not "other"
              if (e.target.value !== 'other') {
                handleInputChange('productCategoryOther', '');
              }
            }}
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
          {formData.productCategory === 'other' && (
            <div className="mt-3">
              <label className="block text-primary mb-2">Specify Category</label>
              <input
                type="text"
                value={formData.productCategoryOther}
                onChange={(e) => handleInputChange('productCategoryOther', e.target.value)}
                className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                placeholder="Enter product category"
                required
              />
            </div>
          )}
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

        <div>
          <label className="block text-primary mb-2">Product Images</label>
          <p className="text-primary text-sm text-opacity-70 mb-3">
            Upload images of your product to help warehouse verify the goods upon receipt
          </p>
          
          <div className="border border-primary border-opacity-20 border-dashed rounded p-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
              id="product-images-upload"
            />
            <label
              htmlFor="product-images-upload"
              className="flex flex-col items-center justify-center cursor-pointer py-4"
            >
              <HiOutlinePhoto className="w-8 h-8 text-primary text-opacity-50 mb-2" />
              <span className="text-primary text-sm">Click to upload images</span>
              <span className="text-primary text-xs text-opacity-70 mt-1">
                PNG, JPG, GIF up to 10MB each
              </span>
            </label>
          </div>

          {imagePreviews.length > 0 && (
            <div className="mt-4">
              <p className="text-primary text-sm mb-3">
                Uploaded Images ({imagePreviews.length})
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Product ${index + 1}`}
                      className="w-full h-32 object-cover border border-primary border-opacity-20 rounded"
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <HiOutlineXMark className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
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
      {/* Warehouse Selection Dropdown */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <label className="block text-primary mb-2">
              Select Warehouse <span className="text-red-500">*</span>
            </label>
            <p className="text-primary text-sm text-opacity-70 mb-3">
              Please select a warehouse for your shipment
            </p>
            <select
              value={formData.selectedWarehouse?.id || ''}
              onChange={(e) => {
                const warehouse = warehouses.find(w => w.id === e.target.value);
                handleInputChange('selectedWarehouse', warehouse || null);
              }}
              className="w-full md:w-96 border border-primary border-opacity-20 p-3 text-primary bg-secondary"
              required
            >
              <option value="">Select a warehouse</option>
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>
                  {warehouse.name} - {warehouse.location} ({formatCurrency(warehouse.pricePerCBM)}/CBM)
                </option>
              ))}
            </select>
          </div>
          {formData.selectedWarehouse && (
            <div className="ml-4 p-4 bg-primary bg-opacity-5 rounded border border-primary border-opacity-20">
              <p className="text-primary text-sm mb-1">Selected:</p>
              <p className="text-primary">{formData.selectedWarehouse.name}</p>
              <p className="text-primary text-sm text-opacity-70">{formData.selectedWarehouse.location}</p>
              <button
                onClick={() => handleInputChange('selectedWarehouse', null)}
                className="mt-2 text-primary text-sm underline hover:text-opacity-70"
              >
                Clear selection
              </button>
            </div>
          )}
        </div>
      </Card>

      <StepForm
        steps={[
          { title: 'Goods Details', component: step1 },
          { title: 'Location', component: step2 },
          { title: 'Summary', component: step3 },
        ]}
        onSubmit={handleSubmit}
        submitLabel="Confirm and Submit Shipment"
      />
    </div>
  );
}

