import React, { useState, useRef, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mt-16 pt-8 border-t border-surface-100 gap-6">
      
      {/* Custom Dropdown for Items Per Page */}
      <div className="flex items-center space-x-3 text-sm text-ink-light font-light relative" ref={dropdownRef}>
        <span>View</span>
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 border-b border-surface-200 py-1 hover:border-ink transition-colors text-ink font-medium focus:outline-none"
        >
          {itemsPerPage}
          <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <span>pieces</span>

        {/* Dropdown Menu - FIXED: Now opens UPWARDS using bottom-full and mb-2 */}
        {isDropdownOpen && (
          <div className="absolute bottom-full mb-2 left-0 w-24 bg-surface-50 border border-surface-100 shadow-premium-hover rounded-xl overflow-hidden z-[100] transform origin-bottom transition-all duration-200 ease-out-expo">
            {[24, 48, 96].map((num) => (
              <button
                key={num}
                onClick={() => {
                  onItemsPerPageChange(num);
                  setIsDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                  itemsPerPage === num 
                    ? 'bg-surface-100 text-ink font-medium' 
                    : 'text-ink-light hover:bg-surface-100 hover:text-ink'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center space-x-6">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="flex items-center space-x-2 text-sm font-medium text-ink hover:text-ink-light disabled:opacity-30 disabled:hover:text-ink transition-colors duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Prev</span>
        </button>
        
        <span className="text-sm font-light text-ink-lighter tracking-wider">
          <span className="text-ink font-medium">{currentPage}</span> / {totalPages}
        </span>
        
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-2 text-sm font-medium text-ink hover:text-ink-light disabled:opacity-30 disabled:hover:text-ink transition-colors duration-300"
        >
          <span>Next</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};