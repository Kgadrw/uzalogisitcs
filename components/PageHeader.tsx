interface PageHeaderProps {
  description?: string;
}

export default function PageHeader({ description }: PageHeaderProps) {
  if (!description) return null;
  
  return (
    <div className="mb-6">
      <p className="text-primary text-opacity-70">{description}</p>
    </div>
  );
}

