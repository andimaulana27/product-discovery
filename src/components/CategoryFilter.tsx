import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <div className="w-full overflow-x-auto pb-4 mb-8 hide-scrollbar">
      <div className="flex items-center gap-3 sm:justify-center min-w-max px-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out-expo ${
              selectedCategory === category
                ? 'bg-ink text-surface-50 shadow-md transform scale-105'
                : 'bg-surface-50 text-ink-light hover:bg-surface-100 hover:text-ink'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};