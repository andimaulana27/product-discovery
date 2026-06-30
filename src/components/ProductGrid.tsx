import React from 'react';
import { Product } from '@/types/product';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center bg-surface-50 rounded-2xl border border-dashed border-surface-200">
        <div className="bg-surface-100 p-5 rounded-full mb-6">
          <svg className="w-10 h-10 text-ink-lighter" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-ink mb-3">No pieces found</h3>
        <p className="text-sm text-ink-light max-w-md font-light leading-relaxed">
          We couldn&apos;t find any pieces matching your current filters. Try exploring other categories or adjusting your search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {products.map((product, index) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          priority={index < 8}
        />
      ))}
    </div>
  );
};