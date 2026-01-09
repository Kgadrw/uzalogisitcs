'use client';

import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Table, { TableRow, TableCell } from '@/components/Table';
import { formatDate } from '@/lib/utils';

// Mock data - replace with API call
const shipments = [
  {
    id: '1',
    clientName: 'John Doe',
    productName: 'Electronics',
    warehouse: 'Central Warehouse',
    status: 'Confirmed',
    submittedDate: new Date('2024-01-15'),
  },
  {
    id: '2',
    clientName: 'Jane Smith',
    productName: 'Furniture',
    warehouse: 'East Coast Hub',
    status: 'In Transit',
    submittedDate: new Date('2024-01-20'),
  },
];

export default function AllShipmentsPage() {
  return (
    <div>
      
      <Card>
        <Table headers={['Client Name', 'Product Name', 'Warehouse', 'Status', 'Submitted Date', 'Action']}>
          {shipments.map((shipment) => (
            <TableRow key={shipment.id}>
              <TableCell>{shipment.clientName}</TableCell>
              <TableCell>{shipment.productName}</TableCell>
              <TableCell>{shipment.warehouse}</TableCell>
              <TableCell>{shipment.status}</TableCell>
              <TableCell>{formatDate(shipment.submittedDate)}</TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/client/shipments/${shipment.id}`}
                  className="text-primary underline hover:text-opacity-70"
                >
                  View Details
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}

