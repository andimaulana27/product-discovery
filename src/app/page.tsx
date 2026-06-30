"use client";

import React from 'react';
import productsData from '@/data/items.json';
import { Product } from '@/types/product';
import { useProductFilter } from '@/hooks/useProductFilter';
import { SearchBar } from '@/components/SearchBar';
import { ProductGrid } from '@/components/ProductGrid';
import { Pagination } from '@/components/Pagination';

// Type assertion to ensure the imported JSON strictly matches our interface
const initialProducts: Product[] = productsData as Product[];

export default function ProductDiscoveryPage() {
  const { 
    searchQuery, 
    setSearchQuery, 
    paginatedProducts, 
    isSearching,
    totalFiltered,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages
  } = useProductFilter(initialProducts);

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            Product Discovery
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of high-quality items. Use the search bar below to find specific products, brands, or tags.
          </p>
        </div>

        {/* Search Section */}
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          isSearching={isSearching} 
        />

        {/* Results Status Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">
            {searchQuery ? "Search Results" : "All Products"}
          </h2>
          <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
            {totalFiltered} items found
          </span>
        </div>

        {/* Product Grid Section */}
        <ProductGrid products={paginatedProducts} />

        {/* Pagination Section */}
        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={totalFiltered}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>
    </main>
  );
}