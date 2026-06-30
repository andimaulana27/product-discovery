import { useState, useMemo, useTransition } from 'react';
import { Product } from '@/types/product';
import { useDebounce } from './useDebounce';

interface UseProductFilterReturn {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
  paginatedProducts: Product[];
  isSearching: boolean;
  isTransitioning: boolean;
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(24);
  
  // React 18 useTransition prevents UI freezing during heavy filter/image renders
  const [isTransitioning, startTransition] = useTransition();
  const debouncedQuery = useDebounce<string>(searchQuery, debounceDelay);

  const categories = useMemo(() => {
    const uniqueCats = new Set(initialProducts.map(p => p.category));
    return ['All', ...Array.from(uniqueCats)];
  }, [initialProducts]);

  // Wrap heavy state updates inside startTransition to keep the UI responsive
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    startTransition(() => {
      setCurrentPage(1);
    });
  };

  const handleCategoryChange = (category: string) => {
    startTransition(() => {
      setSelectedCategory(category);
      setCurrentPage(1);
    });
  };

  const handlePageChange = (page: number) => {
    startTransition(() => {
      setCurrentPage(page);
    });
  };

  const handleItemsPerPageChange = (items: number) => {
    startTransition(() => {
      setItemsPerPage(items);
      setCurrentPage(1);
    });
  };

  const filteredProducts = useMemo(() => {
    let result = initialProducts;

    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }

    if (debouncedQuery.trim()) {
      const lowerCaseQuery = debouncedQuery.toLowerCase();
      result = result.filter((product) => {
        const matchTitle = product.title.toLowerCase().includes(lowerCaseQuery);
        const matchBrand = product.brand.toLowerCase().includes(lowerCaseQuery);
        const matchTags = product.tags.some((tag) =>
          tag.toLowerCase().includes(lowerCaseQuery)
        );
        return matchTitle || matchBrand || matchTags;
      });
    }

    return result;
  }, [debouncedQuery, selectedCategory, initialProducts]);

  const isSearching = searchQuery !== debouncedQuery;
  const totalFiltered = filteredProducts.length;
  const totalPages = Math.ceil(totalFiltered / itemsPerPage) || 1;

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage, itemsPerPage]);

  return {
    searchQuery,
    setSearchQuery: handleSearchChange,
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
    categories,
    paginatedProducts,
    isSearching,
    isTransitioning,
    totalFiltered,
    currentPage,
    setCurrentPage: handlePageChange,
    itemsPerPage,
    setItemsPerPage: handleItemsPerPageChange,
    totalPages,
  };
}