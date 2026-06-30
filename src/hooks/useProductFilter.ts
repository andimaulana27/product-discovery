import { useState, useMemo } from 'react';
import { Product } from '@/types/product';
import { useDebounce } from './useDebounce';

interface UseProductFilterReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredProducts: Product[];
  isSearching: boolean;
}

/**
 * Custom hook to manage product filtering logic with debounce and memoization.
 * * @param initialProducts - The full array of products to filter.
 * @param debounceDelay - The delay in milliseconds for the debounce hook (default: 300).
 * @returns Object containing state and filtered data.
 */
export function useProductFilter(
  initialProducts: Product[],
  debounceDelay: number = 300
): UseProductFilterReturn {
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Apply debounce to the search query
  const debouncedQuery = useDebounce<string>(searchQuery, debounceDelay);

  // Memoize the filtering logic to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    // Return all products if the search query is empty
    if (!debouncedQuery.trim()) {
      return initialProducts;
    }

    const lowerCaseQuery = debouncedQuery.toLowerCase();

    return initialProducts.filter((product) => {
      const matchTitle = product.title.toLowerCase().includes(lowerCaseQuery);
      const matchBrand = product.brand.toLowerCase().includes(lowerCaseQuery);
      
      // Check if any tag matches the query
      const matchTags = product.tags.some((tag) =>
        tag.toLowerCase().includes(lowerCaseQuery)
      );

      return matchTitle || matchBrand || matchTags;
    });
  }, [debouncedQuery, initialProducts]);

  // Determine if a search operation is currently pending
  const isSearching = searchQuery !== debouncedQuery;

  return {
    searchQuery,
    setSearchQuery,
    filteredProducts,
    isSearching,
  };
}