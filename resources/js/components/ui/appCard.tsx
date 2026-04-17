import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { cn } from '@/lib/utils';

interface AppCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  link?: string;
  className?: string;
  onClick?: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  link,
  className,
  onClick,
}) => {
  const CardContent = (
    <div
      className={cn(
        'group flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-300 hover:shadow-md hover:bg-blue-50/30 cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600 transition-colors duration-200 group-hover:bg-blue-200">
          <Icon className="h-6 w-6" />
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-blue-900 transition-colors duration-200">
          {title}
        </h3>
        {subtitle && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
            {subtitle}
          </p>
        )}
      </div>
      
      {link && (
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors duration-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </div>
  );

  if (link) {
    return (
      <Link
        href={link}
        className="block transition-transform duration-200 hover:scale-[1.02]"
      >
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export default AppCard;