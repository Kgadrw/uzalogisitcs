import { ReactNode } from 'react';

interface TableProps {
  headers: string[];
  children: ReactNode;
}

export default function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-primary bg-opacity-5">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-primary border-opacity-20 px-4 py-3 text-left text-primary"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

interface TableRowProps {
  children: ReactNode;
  onClick?: () => void;
}

export function TableRow({ children, onClick }: TableRowProps) {
  return (
    <tr
      className={`border-b border-primary border-opacity-20 ${
        onClick ? 'cursor-pointer hover:bg-primary hover:bg-opacity-5' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </tr>
  );
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export function TableCell({ children, className = '' }: TableCellProps) {
  return (
    <td className={`px-4 py-3 text-primary ${className}`}>
      {children}
    </td>
  );
}

