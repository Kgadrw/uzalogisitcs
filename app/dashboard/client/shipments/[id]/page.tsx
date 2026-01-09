'use client';

import { useParams } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import StatusTimeline from '@/components/StatusTimeline';
import { formatDate, formatCurrency } from '@/lib/utils';

export default function ShipmentDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  
  // Mock data - replace with API call
  const shipment = {
    id,
    productName: 'Electronics',
    productCategory: 'Electronics',
    quantity: 10,
    submittedWeight: 150,
    submittedCBM: 2.5,
    confirmedWeight: 148,
    confirmedCBM: 2.4,
    status: 'Confirmed',
    submittedDate: new Date('2024-01-15'),
    receivedDate: new Date('2024-01-18'),
    confirmedDate: new Date('2024-01-19'),
    costAdjustments: 0,
    originalCost: 1250,
    finalCost: 1230,
  };

  const statuses = [
    { label: 'Submitted', completed: true, date: formatDate(shipment.submittedDate) },
    { label: 'In Transit to Warehouse', completed: true, date: formatDate(shipment.receivedDate) },
    { label: 'Received at Warehouse', completed: true, date: formatDate(shipment.receivedDate) },
    { label: 'Confirmed', completed: shipment.status === 'Confirmed', date: shipment.status === 'Confirmed' ? formatDate(shipment.confirmedDate) : undefined },
  ];

  return (
    <div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <h3 className="text-primary text-xl mb-4">Status Timeline</h3>
            <StatusTimeline statuses={statuses} />
          </Card>
          
          <Card>
            <h3 className="text-primary text-xl mb-4">Product Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-primary text-opacity-70">Product Name</span>
                <span className="text-primary">{shipment.productName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary text-opacity-70">Category</span>
                <span className="text-primary">{shipment.productCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary text-opacity-70">Quantity</span>
                <span className="text-primary">{shipment.quantity}</span>
              </div>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <h3 className="text-primary text-xl mb-4">Weight & Volume</h3>
            <div className="space-y-4">
              <div>
                <p className="text-primary text-sm text-opacity-70 mb-1">Submitted Weight</p>
                <p className="text-primary">{shipment.submittedWeight} kg</p>
              </div>
              <div>
                <p className="text-primary text-sm text-opacity-70 mb-1">Confirmed Weight</p>
                <p className="text-primary">{shipment.confirmedWeight} kg</p>
              </div>
              <div className="border-t border-primary border-opacity-20 pt-4">
                <p className="text-primary text-sm text-opacity-70 mb-1">Submitted CBM</p>
                <p className="text-primary">{shipment.submittedCBM} CBM</p>
              </div>
              <div>
                <p className="text-primary text-sm text-opacity-70 mb-1">Confirmed CBM</p>
                <p className="text-primary">{shipment.confirmedCBM} CBM</p>
              </div>
            </div>
          </Card>
          
          <Card>
            <h3 className="text-primary text-xl mb-4">Cost Adjustments</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-primary text-opacity-70">Original Cost</span>
                <span className="text-primary">{formatCurrency(shipment.originalCost)}</span>
              </div>
              {shipment.costAdjustments !== 0 && (
                <div className="flex justify-between">
                  <span className="text-primary text-opacity-70">Adjustment</span>
                  <span className="text-primary">
                    {shipment.costAdjustments > 0 ? '+' : ''}{formatCurrency(shipment.costAdjustments)}
                  </span>
                </div>
              )}
              <div className="border-t border-primary border-opacity-20 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="text-primary">Final Cost</span>
                  <span className="text-primary text-xl">{formatCurrency(shipment.finalCost)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <Card>
        <h3 className="text-primary text-xl mb-4">Notifications</h3>
        <div className="bg-primary bg-opacity-5 p-4">
          <p className="text-primary">
            Your goods have been received and confirmed by the warehouse.
          </p>
        </div>
      </Card>
    </div>
  );
}

