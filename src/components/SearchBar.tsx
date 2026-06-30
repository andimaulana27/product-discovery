import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  isSearching: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, isSearching }) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto mb-12 group">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products, brands, or tags..."
        className="w-full px-6 py-4 pl-14 bg-surface-50 border border-surface-100 rounded-full shadow-premium-sm focus:shadow-premium-hover focus:border-surface-200 outline-none transition-all duration-500 ease-out-expo text-ink placeholder-ink-lighter text-sm font-medium"
      />
      
      {/* Search Icon with subtle transition */}
      <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-ink text-ink-lighter">
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      {/* Elegant Loader indicator */}
      {isSearching && (
        <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
          <div className="animate-spin h-4 w-4 border-[1.5px] border-ink border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
};