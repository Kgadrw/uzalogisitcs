'use client';

import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import { 
  HiPlusCircle, 
  HiTruck, 
  HiCurrencyDollar,
  HiChat
} from 'react-icons/hi';

export default function ClientDashboard() {
  return (
    <div>
      <PageHeader description="Welcome. Create, track, and manage your shipments in one place." />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
    </div>
  );
}

