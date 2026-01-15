'use client';

import { useState } from 'react';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Table, { TableRow, TableCell } from '@/components/Table';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

// Mock data - replace with API call
const clients = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234-567-8900',
    shipmentsCount: 12,
    status: 'Active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1 234-567-8901',
    shipmentsCount: 8,
    status: 'Active',
  },
];

export default function ClientManagementPage() {
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  return (
    <div>
      
      <div className="mb-6">
        <Link
          href="/dashboard/admin/assisted"
          className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-secondary hover:bg-opacity-90"
        >
          <HiOutlinePlusCircle className="w-5 h-5" />
          <span>Create Shipment for Client</span>
        </Link>
      </div>
      
      <Card>
        <h3 className="text-primary text-xl mb-4">All Clients</h3>
        <Table headers={['Client Name', 'Email', 'Phone', 'Shipments', 'Status', 'Actions']}>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell>{client.name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone}</TableCell>
              <TableCell>{client.shipmentsCount}</TableCell>
              <TableCell>{client.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedClient(client.id)}
                    className="text-primary underline hover:text-opacity-70"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      // Handle edit shipment
                      console.log('Edit shipment for client:', client.id);
                    }}
                    className="text-primary underline hover:text-opacity-70"
                  >
                    Edit Shipment
                  </button>
                  <button
                    onClick={() => {
                      // Handle assign warehouse
                      console.log('Assign warehouse for client:', client.id);
                    }}
                    className="text-primary underline hover:text-opacity-70"
                  >
                    Assign Warehouse
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </Card>
      
      {selectedClient && (
        <Card className="mt-6">
          <h3 className="text-primary text-xl mb-4">Client Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-primary text-opacity-70">Client ID</span>
              <span className="text-primary">{selectedClient}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary text-opacity-70">Shipment History</span>
              <span className="text-primary">View All</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary text-opacity-70">Send Message</span>
              <button className="text-primary underline hover:text-opacity-70">
                Open Chat
              </button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

