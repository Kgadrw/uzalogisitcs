'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Card from '@/components/Card';
import Table, { TableRow, TableCell } from '@/components/Table';
import { HiOutlinePlusCircle, HiOutlineXMark, HiOutlineCheckCircle } from 'react-icons/hi2';
import { useToast } from '@/contexts/ToastContext';

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
  const { showError, showSuccess } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showCredentials, setShowCredentials] = useState(false);
  const [generatedCredentials, setGeneratedCredentials] = useState<{
    email: string;
    password: string;
    warehouseName: string;
  } | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    city: '',
    country: '',
    capacity: '',
    pricePerCBM: '',
    services: [] as string[],
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const services = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      return { ...prev, services };
    });
  };

  const generatePassword = () => {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    return Array.from(crypto.getRandomValues(new Uint32Array(length)))
      .map(x => charset[x % charset.length])
      .join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate credentials
    const email = formData.contactEmail || `${formData.name.toLowerCase().replace(/\s+/g, '.')}@warehouse.uzalogistics.com`;
    const password = generatePassword();
    
    // Mock API call - replace with actual API call
    try {
      // const response = await fetch('/api/admin/warehouses/create-account', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ ...formData, email, password }),
      // });
      // const data = await response.json();
      
      // For now, just show credentials
      setGeneratedCredentials({
        email,
        password,
        warehouseName: formData.name,
      });
      setShowCredentials(true);
      setShowCreateForm(false);
      
      // Reset form
      setFormData({
        name: '',
        location: '',
        address: '',
        city: '',
        country: '',
        capacity: '',
        pricePerCBM: '',
        services: [],
        contactName: '',
        contactEmail: '',
        contactPhone: '',
      });
    } catch (error) {
      console.error('Error creating warehouse account:', error);
      showError('Failed to create warehouse account. Please try again.');
    }
  };

  const handleCopyCredentials = (text: string) => {
    navigator.clipboard.writeText(text);
    showSuccess('Copied to clipboard!', 2000);
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <PageHeader title="Warehouse" />
        <button
          onClick={() => setShowCreateForm(true)}
          className="flex items-center gap-2 px-6 py-2 bg-primary text-secondary hover:bg-opacity-90"
        >
          <HiOutlinePlusCircle className="w-5 h-5" />
          <span>Create Warehouse Account</span>
        </button>
      </div>

      {showCredentials && generatedCredentials && (
        <Card className="mb-6 border-green-500 border-2">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-2">
              <HiOutlineCheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-primary text-xl">Warehouse Account Created Successfully!</h3>
            </div>
            <button
              onClick={() => {
                setShowCredentials(false);
                setGeneratedCredentials(null);
              }}
              className="text-primary hover:text-opacity-70"
            >
              <HiOutlineXMark className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-primary bg-opacity-5 p-4 rounded mb-4">
            <p className="text-primary text-sm mb-3">
              Please provide these credentials to <strong>{generatedCredentials.warehouseName}</strong>:
            </p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-primary text-sm mb-1">Email:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={generatedCredentials.email}
                    readOnly
                    className="flex-1 border border-primary border-opacity-20 p-2 text-primary bg-secondary"
                  />
                  <button
                    onClick={() => handleCopyCredentials(generatedCredentials.email)}
                    className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-secondary"
                  >
                    Copy
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-primary text-sm mb-1">Password:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={generatedCredentials.password}
                    readOnly
                    className="flex-1 border border-primary border-opacity-20 p-2 text-primary bg-secondary font-mono"
                  />
                  <button
                    onClick={() => handleCopyCredentials(generatedCredentials.password)}
                    className="px-4 py-2 border border-primary text-primary hover:bg-primary hover:text-secondary"
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-yellow-500 bg-opacity-10 border border-yellow-500 border-opacity-30 rounded">
              <p className="text-primary text-sm">
                <strong>Important:</strong> Save these credentials securely. The warehouse will use these to log in to their dashboard.
              </p>
            </div>
          </div>
        </Card>
      )}

      {showCreateForm && (
        <Card className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-primary text-2xl">Create Warehouse Account</h2>
            <button
              onClick={() => setShowCreateForm(false)}
              className="text-primary hover:text-opacity-70"
            >
              <HiOutlineXMark className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h3 className="text-primary text-lg mb-4">Warehouse Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-primary mb-2">Warehouse Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-primary mb-2">Location <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-primary mb-2">City <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-primary mb-2">Country <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-primary mb-2">Full Address <span className="text-red-500">*</span></label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                    rows={2}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-primary mb-2">Total Capacity (CBM) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                    required
                    min="1"
                  />
                </div>
                
                <div>
                  <label className="block text-primary mb-2">Price per CBM ($) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.pricePerCBM}
                    onChange={(e) => handleInputChange('pricePerCBM', e.target.value)}
                    className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                    required
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-primary text-lg mb-4">Services Offered</h3>
              <div className="flex flex-wrap gap-3">
                {['Storage', 'Handling', 'Packaging', 'Shipping', 'Customs'].map((service) => (
                  <label key={service} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="mr-2"
                    />
                    <span className="text-primary">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-primary text-lg mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-primary mb-2">Contact Person Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange('contactName', e.target.value)}
                    className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-primary mb-2">Contact Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                    required
                    placeholder="Will be used as login email"
                  />
                </div>
                
                <div>
                  <label className="block text-primary mb-2">Contact Phone <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                    className="w-full border border-primary border-opacity-20 p-3 text-primary bg-secondary"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-secondary hover:bg-opacity-90"
              >
                Create Account
              </button>
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-2 border border-primary text-primary hover:bg-primary hover:text-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </Card>
      )}

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

