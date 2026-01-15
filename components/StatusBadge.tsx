interface StatusBadgeProps {
  status: string;
}

export function getStatusTextColor(status: string): string {
    const normalizedStatus = status.toLowerCase();
    
  // Waiting/Pending statuses - Red text
    if (normalizedStatus.includes('waiting') || 
        normalizedStatus.includes('pending') ||
        normalizedStatus === 'submitted') {
    return 'text-red-600';
    }
    
  // Confirmed statuses - Green text
    if (normalizedStatus.includes('confirmed') || 
        normalizedStatus.includes('completed') ||
        normalizedStatus.includes('delivered')) {
    return 'text-green-600';
    }
    
  // In Transit statuses - Yellow/Orange text
    if (normalizedStatus.includes('transit') || 
        normalizedStatus.includes('shipping')) {
    return 'text-yellow-600';
    }
    
  // Received statuses - Blue text
    if (normalizedStatus.includes('received') || 
        normalizedStatus.includes('at warehouse')) {
    return 'text-blue-600';
  }
  
  // Default - Gray text
  return 'text-gray-600';
}

export function getStatusBackgroundColor(status: string): string {
  const normalizedStatus = status.toLowerCase();
  
  // Waiting/Pending statuses - Red background (lighter)
  if (normalizedStatus.includes('waiting') || 
      normalizedStatus.includes('pending') ||
      normalizedStatus === 'submitted') {
    return 'bg-red-50';
    }
    
  // Confirmed statuses - Green background (lighter)
  if (normalizedStatus.includes('confirmed') || 
      normalizedStatus.includes('completed') ||
      normalizedStatus.includes('delivered')) {
    return 'bg-green-50';
  }
  
  // In Transit statuses - Yellow/Orange background (lighter)
  if (normalizedStatus.includes('transit') || 
      normalizedStatus.includes('shipping')) {
    return 'bg-yellow-50';
  }
  
  // Received statuses - Blue background (lighter)
  if (normalizedStatus.includes('received') || 
      normalizedStatus.includes('at warehouse')) {
    return 'bg-blue-50';
  }
  
  // Default - Gray background (lighter)
  return 'bg-gray-50';
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`text-sm ${getStatusTextColor(status)}`}>
      {status}
    </span>
  );
}

