'use client';

import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Table, { TableRow, TableCell } from '@/components/Table';
import StatusBadge from '@/components/StatusBadge';
import { formatDate } from '@/lib/utils';
import { HiOutlineEye, HiOutlineCheckCircle } from 'react-icons/hi2';

// Mock data - replace with API call
const shipments = [
  {
    id: '1',
    clientName: 'John Doe',
    productName: 'Electronics',
    estimatedWeight: 150,
    estimatedCBM: 2.5,
    pickupLocation: 'New York, USA',
    arrivalDate: new Date('2024-01-25'),
    status: 'In Transit',
  },
  {
    id: '2',
    clientName: 'Jane Smith',
    productName: 'Furniture',
    estimatedWeight: 300,
    estimatedCBM: 5.0,
    pickupLocation: 'Boston, USA',
    arrivalDate: new Date('2024-01-26'),
    status: 'Pending',
  },
];

export default function IncomingShipmentsPage() {
  return (
    <div>
      
      <Table headers={['Client Name', 'Product Name', 'Estimated Weight', 'Estimated CBM', 'Pickup Location', 'Arrival Date', 'Status', 'Action']}>
        {shipments.map((shipment) => (
          <TableRow key={shipment.id}>
            <TableCell>{shipment.clientName}</TableCell>
            <TableCell>{shipment.productName}</TableCell>
            <TableCell>{shipment.estimatedWeight} kg</TableCell>
            <TableCell>{shipment.estimatedCBM}</TableCell>
            <TableCell>{shipment.pickupLocation}</TableCell>
            <TableCell>{formatDate(shipment.arrivalDate)}</TableCell>
            <TableCell>
              <StatusBadge status={shipment.status} />
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Link
                  href={`/dashboard/warehouse/confirm/${shipment.id}`}
                  className="flex items-center gap-1 text-primary underline hover:text-opacity-70"
                >
                  <HiOutlineEye className="w-4 h-4" />
                  <span>View</span>
                </Link>
                {shipment.status === 'Pending' && (
                  <Link
                    href={`/dashboard/warehouse/confirm/${shipment.id}`}
                    className="flex items-center gap-1 text-primary underline hover:text-opacity-70"
                  >
                    <HiOutlineCheckCircle className="w-4 h-4 text-blue-500" />
                    <span>Confirm Receipt</span>
                  </Link>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

