'use client';

import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Table, { TableRow, TableCell } from '@/components/Table';
import StatusBadge, { getStatusBackgroundColor } from '@/components/StatusBadge';
import { formatDate } from '@/lib/utils';
import { HiOutlineEye, HiOutlineCube, HiOutlineScale, HiOutlineTruck, HiOutlinePlusCircle } from 'react-icons/hi2';

// Mock data - replace with API call
const shipments = [
  {
    id: '1',
    productName: 'Electronics',
    status: 'Confirmed',
    submittedDate: new Date('2024-01-15'),
    estimatedWeight: 150,
    estimatedCBM: 2.5,
  },
  {
    id: '2',
    productName: 'Furniture',
    status: 'In Transit to Warehouse',
    submittedDate: new Date('2024-01-20'),
    estimatedWeight: 300,
    estimatedCBM: 5.0,
  },
  {
    id: '3',
    productName: 'Clothing',
    status: 'Waiting for Confirmation',
    submittedDate: new Date('2024-01-22'),
    estimatedWeight: 50,
    estimatedCBM: 1.0,
  },
  {
    id: '4',
    productName: 'Books',
    status: 'Received at Warehouse',
    submittedDate: new Date('2024-01-18'),
    estimatedWeight: 100,
    estimatedCBM: 2.0,
  },
];

export default function ShipmentsPage() {
  const hasShipments = shipments.length > 0;

  return (
    <div className="space-y-6">
      {hasShipments ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary text-opacity-70 text-sm">
                Track and manage all your shipments. Click "View" to see details or create a new shipment.
              </p>
            </div>
            <Link
              href="/dashboard/client/shipments/new"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm text-primary border border-primary border-opacity-20 hover:bg-primary hover:bg-opacity-5 transition-all duration-200"
            >
              <HiOutlinePlusCircle className="w-4 h-4" />
              <span>New Shipment</span>
            </Link>
          </div>
          <Table headers={['Product', 'Status', 'Date', 'Weight', 'Volume', 'Action']}>
            {shipments.map((shipment) => (
              <TableRow 
                key={shipment.id} 
                className="group"
              >
                <TableCell>
                  <div className="text-primary">{shipment.productName}</div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={shipment.status} />
                </TableCell>
                <TableCell>
                  <div className="text-primary text-opacity-80">{formatDate(shipment.submittedDate)}</div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-primary">
                    <HiOutlineScale className="w-4 h-4 text-primary text-opacity-60" />
                    <span>{shipment.estimatedWeight} kg</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-primary">
                    <HiOutlineCube className="w-4 h-4 text-primary text-opacity-60" />
                    <span>{shipment.estimatedCBM} CBM</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/dashboard/client/shipments/${shipment.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm text-primary transition-all duration-200"
                  >
                    <HiOutlineEye className="w-4 h-4" />
                    <span>View</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="mb-6">
            <HiOutlineTruck className="w-16 h-16 text-primary text-opacity-40" />
          </div>
          <h3 className="text-xl text-primary mb-2">No Shipments Yet</h3>
          <p className="text-primary text-opacity-70 text-center max-w-md mb-8">
            You haven't created any shipments yet. Get started by creating your first shipment request.
          </p>
          <Link
            href="/dashboard/client/shipments/new"
            className="inline-flex items-center gap-2 px-6 py-3 text-primary border border-primary border-opacity-20 hover:bg-primary hover:bg-opacity-5 transition-all duration-200"
          >
            <HiOutlinePlusCircle className="w-5 h-5" />
            <span>Create Your First Shipment</span>
          </Link>
        </div>
      )}
    </div>
  );
}

