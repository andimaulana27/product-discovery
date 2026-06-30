"use client";

import React from 'react';
import productsData from '@/data/items.json';
import { Product } from '@/types/product';
import { useProductFilter } from '@/hooks/useProductFilter';
import { SearchBar } from '@/components/SearchBar';
import { ProductGrid } from '@/components/ProductGrid';
import { Pagination } from '@/components/Pagination';
import { CategoryFilter } from '@/components/CategoryFilter';

const initialProducts: Product[] = productsData as Product[];

export default function ProductDiscoveryPage() {
  const { 
    searchQuery, 
    setSearchQuery, 
    selectedCategory,
    setSelectedCategory,
    categories,
    paginatedProducts, 
    isSearching,
    isTransitioning,
    totalFiltered,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    totalPages
  } = useProductFilter(initialProducts);

  const isUpdating = isSearching || isTransitioning;

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-ink tracking-tight mb-5">
            Curated Collection
          </h1>
          <p className="text-sm sm:text-base text-ink-light max-w-2xl mx-auto font-light leading-relaxed">
            Explore our selection of high-quality essentials. Use the search bar or categories to find specific pieces.
          </p>
        </div>

        {/* Filters & Search */}
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          isSearching={isSearching} 
        />

        {/* Results Meta */}
        <div className="mb-8 flex items-center justify-between border-b border-surface-100 pb-4">
          <h2 className="text-lg font-medium text-ink">
            {searchQuery || selectedCategory !== 'All' ? "Search Results" : "All Products"}
          </h2>
          <span className="text-sm font-light text-ink-lighter tracking-wide">
            {totalFiltered} {totalFiltered === 1 ? 'piece' : 'pieces'}
          </span>
        </div>

        {/* Product Grid with Concurrent Rendering States */}
        <div className={`transition-all duration-500 ease-out-expo ${
          isUpdating ? 'opacity-40 blur-[2px] pointer-events-none scale-[0.99]' : 'opacity-100 blur-0 scale-100'
        }`}>
          <ProductGrid products={paginatedProducts} />
        </div>

        {/* Pagination */}
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