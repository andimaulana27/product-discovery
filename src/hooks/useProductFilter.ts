import { useState, useMemo, useEffect } from 'react';
import { Product } from '@/types/product';
import { useDebounce } from './useDebounce';

interface UseProductFilterReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  paginatedProducts: Product[];
  isSearching: boolean;
  totalFiltered: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  totalPages: number;
}

export function useProductFilter(
  initialProducts: Product[],
  debounceDelay: number = 300
): UseProductFilterReturn {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(24);
  
  const debouncedQuery = useDebounce<string>(searchQuery, debounceDelay);

  // Reset to page 1 whenever the debounced search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  const filteredProducts = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return initialProducts;
    }

    const lowerCaseQuery = debouncedQuery.toLowerCase();

    return initialProducts.filter((product) => {
      const matchTitle = product.title.toLowerCase().includes(lowerCaseQuery);
      const matchBrand = product.brand.toLowerCase().includes(lowerCaseQuery);
      const matchTags = product.tags.some((tag) =>
        tag.toLowerCase().includes(lowerCaseQuery)
      );

      return matchTitle || matchBrand || matchTags;
    });
  }, [debouncedQuery, initialProducts]);

  const isSearching = searchQuery !== debouncedQuery;
  const totalFiltered = filteredProducts.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage);

  // Slice the filtered products based on the current pagination state
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return {
    searchQuery,
    setSearchQuery,
    paginatedProducts,
    isSearching,
    totalFiltered,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages,
  };
}