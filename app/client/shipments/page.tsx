'use client';

import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Table, { TableRow, TableCell } from '@/components/Table';
import { formatDate } from '@/lib/utils';
import { HiOutlineEye } from 'react-icons/hi2';

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
];

export default function ShipmentsPage() {
  return (
    <div>
      
      <Table headers={['Product Name', 'Status', 'Submitted Date', 'Weight (kg)', 'Volume (CBM)', 'Action']}>
        {shipments.map((shipment) => (
          <TableRow key={shipment.id}>
            <TableCell>{shipment.productName}</TableCell>
            <TableCell>{shipment.status}</TableCell>
            <TableCell>{formatDate(shipment.submittedDate)}</TableCell>
            <TableCell>{shipment.estimatedWeight}</TableCell>
            <TableCell>{shipment.estimatedCBM}</TableCell>
            <TableCell>
              <Link
                href={`/client/shipments/${shipment.id}`}
                className="flex items-center gap-1 text-primary underline hover:text-opacity-70"
              >
                <HiOutlineEye className="w-4 h-4" />
                <span>View Details</span>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}

