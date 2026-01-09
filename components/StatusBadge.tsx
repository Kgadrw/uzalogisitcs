interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusColor = (status: string) => {
    const normalizedStatus = status.toLowerCase();
    
    // Waiting/Pending statuses - Red
    if (normalizedStatus.includes('waiting') || 
        normalizedStatus.includes('pending') ||
        normalizedStatus === 'submitted') {
      return 'bg-red-500 text-white';
    }
    
    // Confirmed statuses - Green
    if (normalizedStatus.includes('confirmed') || 
        normalizedStatus.includes('completed') ||
        normalizedStatus.includes('delivered')) {
      return 'bg-green-500 text-white';
    }
    
    // In Transit statuses - Yellow/Orange
    if (normalizedStatus.includes('transit') || 
        normalizedStatus.includes('shipping')) {
      return 'bg-yellow-500 text-white';
    }
    
    // Received statuses - Blue
    if (normalizedStatus.includes('received') || 
        normalizedStatus.includes('at warehouse')) {
      return 'bg-blue-500 text-white';
    }
    
    // Default - Gray
    return 'bg-gray-500 text-white';
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}

