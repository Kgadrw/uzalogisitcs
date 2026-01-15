'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { 
  HiPlusCircle, 
  HiTruck, 
  HiCurrencyDollar,
  HiChat,
  HiClock
} from 'react-icons/hi';
import { formatDate } from '@/lib/utils';

export default function ClientDashboard() {
  // Mock recent actions data - replace with API call
  const [recentActions] = useState([
    {
      id: '1',
      action: 'Created shipment #1 (Electronics)',
      shipmentId: '1',
      date: new Date('2024-01-25T11:00:00'),
    },
    {
      id: '2',
      action: 'Viewed shipment #2 details',
      shipmentId: '2',
      date: new Date('2024-01-25T08:30:00'),
    },
    {
      id: '3',
      action: 'Created shipment #3 (Clothing)',
      shipmentId: '3',
      date: new Date('2024-01-24T15:20:00'),
    },
    {
      id: '4',
      action: 'Updated shipment #1 information',
      shipmentId: '1',
      date: new Date('2024-01-24T12:00:00'),
    },
  ]);

  return (
    <div>
      <PageHeader />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Link href="/dashboard/client/shipments/new">
          <Card className="cursor-pointer hover:border-primary">
            <div className="flex items-start gap-4">
              <HiPlusCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-primary text-xl mb-2">Create New Shipment</h3>
                <p className="text-primary text-opacity-70">
                  Start a new shipment request with step-by-step guidance.
                </p>
              </div>
            </div>
          </Card>
        </Link>
        
        <Link href="/dashboard/client/shipments">
          <Card className="cursor-pointer hover:border-primary">
            <div className="flex items-start gap-4">
              <HiTruck className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-primary text-xl mb-2">View My Shipments</h3>
                <p className="text-primary text-opacity-70">
                  Track and manage all your active and past shipments.
                </p>
              </div>
            </div>
          </Card>
        </Link>
        
        <Card>
          <div className="flex items-start gap-4">
            <HiCurrencyDollar className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-primary text-xl mb-2">Get Cost Estimate</h3>
              <p className="text-primary text-opacity-70">
                Calculate estimated shipping costs before creating a shipment.
              </p>
            </div>
          </div>
        </Card>
        
        <Card>
          <div className="flex items-start gap-4">
            <HiChat className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-primary text-xl mb-2">Contact Support</h3>
              <p className="text-primary text-opacity-70">
                Get help with your shipments or ask questions.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Actions Section */}
      <Card>
        <div className="flex items-center gap-2 mb-6">
          <HiClock className="w-6 h-6 text-primary" />
          <h2 className="text-primary text-2xl">Recent Actions</h2>
        </div>

        {recentActions.length > 0 ? (
          <div className="space-y-3">
            {recentActions.map((action) => (
              <div
                key={action.id}
                className="border border-primary border-opacity-20 p-4 rounded hover:bg-primary hover:bg-opacity-5 transition-colors"
              >
                <Link
                  href={`/dashboard/client/shipments/${action.shipmentId}`}
                  className="block"
                >
                  <p className="text-primary mb-1">{action.action}</p>
                  <p className="text-primary text-sm text-opacity-70">
                    {formatDate(action.date)}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-primary text-opacity-70">No recent actions</p>
          </div>
        )}
      </Card>
    </div>
  );
}

