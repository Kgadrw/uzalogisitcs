'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { HiCurrencyDollar, HiTruck, HiCube, HiCog } from 'react-icons/hi';
import { formatCurrency } from '@/lib/utils';

export default function PricingManagementPage() {
  // Mock pricing data - replace with API call
  const [pricing, setPricing] = useState({
    transportFeePerKg: 0.5,
    handlingFee: 50,
    warehouses: [
      {
        id: '1',
        name: 'Central Warehouse',
        location: 'New York, USA',
        pricePerCBM: 25,
      },
      {
        id: '2',
        name: 'East Coast Hub',
        location: 'Boston, USA',
        pricePerCBM: 30,
      },
      {
        id: '3',
        name: 'West Coast Facility',
        location: 'Los Angeles, USA',
        pricePerCBM: 28,
      },
    ],
  });

  const [editingWarehouse, setEditingWarehouse] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ [key: string]: number }>({});

  const handleUpdateTransportFee = (value: number) => {
    setPricing(prev => ({ ...prev, transportFeePerKg: value }));
    // TODO: API call to save
    console.log('Updated transport fee per kg:', value);
  };

  const handleUpdateHandlingFee = (value: number) => {
    setPricing(prev => ({ ...prev, handlingFee: value }));
    // TODO: API call to save
    console.log('Updated handling fee:', value);
  };

  const handleStartEditWarehouse = (warehouseId: string, currentPrice: number) => {
    setEditingWarehouse(warehouseId);
    setEditValues({ [warehouseId]: currentPrice });
  };

  const handleSaveWarehousePrice = (warehouseId: string) => {
    const newPrice = editValues[warehouseId];
    if (newPrice !== undefined && newPrice > 0) {
      setPricing(prev => ({
        ...prev,
        warehouses: prev.warehouses.map(w =>
          w.id === warehouseId ? { ...w, pricePerCBM: newPrice } : w
        ),
      }));
      // TODO: API call to save
      console.log(`Updated warehouse ${warehouseId} price:`, newPrice);
    }
    setEditingWarehouse(null);
    setEditValues({});
  };

  const handleCancelEdit = () => {
    setEditingWarehouse(null);
    setEditValues({});
  };

  return (
    <div>
      <PageHeader description="Manage pricing settings for transport fees, handling fees, and warehouse storage rates." />
      
      {/* Global Pricing Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <HiTruck className="w-6 h-6 text-primary" />
            <h3 className="text-primary text-xl font-semibold">Transport Fee</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-primary mb-2">Price per Kilogram (kg)</label>
              <div className="flex items-center gap-3">
                <span className="text-primary text-sm">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={pricing.transportFeePerKg}
                  onChange={(e) => handleUpdateTransportFee(parseFloat(e.target.value) || 0)}
                  className="flex-1 border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                />
                <span className="text-primary text-sm">per kg</span>
              </div>
              <p className="text-primary text-sm text-opacity-70 mt-2">
                Current rate: {formatCurrency(pricing.transportFeePerKg)} per kg
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <HiCog className="w-6 h-6 text-primary" />
            <h3 className="text-primary text-xl font-semibold">Handling Fee</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-primary mb-2">Fixed Handling Fee</label>
              <div className="flex items-center gap-3">
                <span className="text-primary text-sm">$</span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={pricing.handlingFee}
                  onChange={(e) => handleUpdateHandlingFee(parseFloat(e.target.value) || 0)}
                  className="flex-1 border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                />
                <span className="text-primary text-sm">per shipment</span>
              </div>
              <p className="text-primary text-sm text-opacity-70 mt-2">
                Current rate: {formatCurrency(pricing.handlingFee)} per shipment
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Warehouse Pricing */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <HiCube className="w-6 h-6 text-primary" />
          <h3 className="text-primary text-xl font-semibold">Warehouse Storage Pricing</h3>
        </div>
        
        <div className="space-y-4">
          {pricing.warehouses.map((warehouse) => (
            <div
              key={warehouse.id}
              className="border border-primary border-opacity-20 p-4 rounded"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-primary text-lg font-medium mb-1">{warehouse.name}</h4>
                  <p className="text-primary text-sm text-opacity-70">{warehouse.location}</p>
                </div>
                <div className="flex items-center gap-4">
                  {editingWarehouse === warehouse.id ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-primary text-sm">$</span>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          value={editValues[warehouse.id] || warehouse.pricePerCBM}
                          onChange={(e) =>
                            setEditValues({
                              ...editValues,
                              [warehouse.id]: parseFloat(e.target.value) || 0,
                            })
                          }
                          className="w-24 border border-primary border-opacity-20 p-2 text-primary bg-secondary"
                        />
                        <span className="text-primary text-sm">per CBM</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveWarehousePrice(warehouse.id)}
                          className="px-4 py-2 bg-primary text-secondary hover:bg-opacity-90 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-secondary transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-right">
                        <p className="text-primary text-2xl font-semibold">
                          {formatCurrency(warehouse.pricePerCBM)}
                        </p>
                        <p className="text-primary text-xs text-opacity-70">per CBM</p>
                      </div>
                      <button
                        onClick={() => handleStartEditWarehouse(warehouse.id, warehouse.pricePerCBM)}
                        className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-secondary transition-colors"
                      >
                        Edit Price
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Pricing Information */}
      <Card className="mt-6">
        <div className="flex items-center gap-3 mb-4">
          <HiCurrencyDollar className="w-6 h-6 text-primary" />
          <h3 className="text-primary text-xl font-semibold">Pricing Calculation</h3>
        </div>
        <div className="bg-primary bg-opacity-5 p-4 rounded">
          <p className="text-primary text-sm mb-2">
            <strong>Total Cost Formula:</strong>
          </p>
          <p className="text-primary text-sm text-opacity-70">
            Transport Fee = Weight (kg) × {formatCurrency(pricing.transportFeePerKg)} per kg
          </p>
          <p className="text-primary text-sm text-opacity-70">
            Storage Fee = Volume (CBM) × Warehouse Price per CBM
          </p>
          <p className="text-primary text-sm text-opacity-70">
            Handling Fee = {formatCurrency(pricing.handlingFee)} (fixed)
          </p>
          <p className="text-primary text-sm font-medium mt-3">
            Total = Transport Fee + Storage Fee + Handling Fee
          </p>
        </div>
      </Card>
    </div>
  );
}

