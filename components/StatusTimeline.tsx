import { HiOutlineCheck } from 'react-icons/hi2';

interface StatusTimelineProps {
  statuses: { label: string; completed: boolean; date?: string }[];
}

export default function StatusTimeline({ statuses }: StatusTimelineProps) {
  return (
    <div className="space-y-4">
      {statuses.map((status, index) => (
        <div key={index} className="flex items-start">
          <div className="flex flex-col items-center mr-4">
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                status.completed
                  ? 'bg-primary border-primary'
                  : 'border-primary border-opacity-30'
              }`}
            >
              {status.completed && (
                <HiOutlineCheck className="w-4 h-4 text-secondary" />
              )}
            </div>
            {index < statuses.length - 1 && (
              <div
                className={`w-0.5 h-12 mt-2 ${
                  status.completed ? 'bg-primary' : 'bg-primary bg-opacity-20'
                }`}
              />
            )}
          </div>
          <div className="flex-1 pt-1">
            <div
              className={`${
                status.completed ? 'text-primary' : 'text-primary text-opacity-50'
              }`}
            >
              {status.label}
            </div>
            {status.date && (
              <div className="text-sm text-primary text-opacity-70 mt-1">
                {status.date}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

