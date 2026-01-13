export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getStatusBackgroundColor(status: string): string {
  const normalizedStatus = status.toLowerCase();
  
  // Waiting/Pending statuses - Red
  if (normalizedStatus.includes('waiting') || 
      normalizedStatus.includes('pending') ||
      normalizedStatus === 'submitted') {
    return 'bg-red-500 bg-opacity-10';
  }
  
  // Confirmed statuses - Green
  if (normalizedStatus.includes('confirmed') || 
      normalizedStatus.includes('completed') ||
      normalizedStatus.includes('delivered')) {
    return 'bg-green-500 bg-opacity-10';
  }
  
  // In Transit statuses - Yellow/Orange
  if (normalizedStatus.includes('transit') || 
      normalizedStatus.includes('shipping')) {
    return 'bg-yellow-500 bg-opacity-10';
  }
  
  // Received statuses - Blue
  if (normalizedStatus.includes('received') || 
      normalizedStatus.includes('at warehouse')) {
    return 'bg-blue-500 bg-opacity-10';
  }
  
  // Default - Gray
  return 'bg-gray-500 bg-opacity-10';
}
