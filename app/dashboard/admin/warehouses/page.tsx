'use client';

import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Table, { TableRow, TableCell } from '@/components/Table';

// Mock data - replace with API call
const warehouses = [
  {
    id: '1',
    name: 'Central Warehouse',
    location: 'New York, USA',
    capacity: '5000 CBM',
    status: 'Active',
    performance: '95%',
  },
  {
    id: '2',
    name: 'East Coast Hub',
    location: 'Boston, USA',
    capacity: '3000 CBM',
    status: 'Active',
    performance: '92%',
  },
  {
    id: '3',
    name: 'West Coast Facility',
    location: 'Los Angeles, USA',
    capacity: '4000 CBM',
    status: 'Pending',
    performance: 'N/A',
  },
];

export default function WarehouseManagementPage() {
  return (
    <div>
      
      <Card>
        <Table headers={['Warehouse Name', 'Location', 'Capacity', 'Status', 'Performance', 'Actions']}>
          {warehouses.map((warehouse) => (
            <TableRow key={warehouse.id}>
              <TableCell>{warehouse.name}</TableCell>
              <TableCell>{warehouse.location}</TableCell>
              <TableCell>{warehouse.capacity}</TableCell>
              <TableCell>{warehouse.status}</TableCell>
              <TableCell>{warehouse.performance}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      // Handle approve
                      console.log('Approve warehouse:', warehouse.id);
                    }}
                    className="text-primary underline hover:text-opacity-70"
                  >
                    {warehouse.status === 'Pending' ? 'Approve' : 'View Details'}
                  </button>
                  {warehouse.status === 'Active' && (
                    <button
                      onClick={() => {
                        // Handle suspend
                        console.log('Suspend warehouse:', warehouse.id);
                      }}
                      className="text-primary underline hover:text-opacity-70"
                    >
                      Suspend
                    </button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
    </div>
  );
}

