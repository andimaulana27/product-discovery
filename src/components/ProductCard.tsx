"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const parsedPrice = product.price !== null && product.price !== undefined ? Number(product.price) : null;
  const formattedPrice = parsedPrice !== null && !isNaN(parsedPrice) ? `$${parsedPrice.toFixed(2)}` : 'N/A';

  const parsedRating = product.rating !== null && product.rating !== undefined ? Number(product.rating) : null;
  const formattedRating = parsedRating !== null && !isNaN(parsedRating) ? parsedRating.toFixed(1) : '-';

  return (
    <div className="bg-surface-50 rounded-xl shadow-premium-sm hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-500 ease-out-expo flex flex-col h-full overflow-hidden group cursor-pointer">
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-surface-100 flex-shrink-0 overflow-hidden">
        
        {/* Skeleton Loader: Displayed while the image is downloading */}
        {product.image && !isImageLoaded && (
          <div className="absolute inset-0 z-10 bg-surface-200 animate-pulse" />
        )}

        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={priority}
            // Bypass Next.js image optimization in development for faster local iteration
            unoptimized={process.env.NODE_ENV === 'development'} 
            onLoad={() => setIsImageLoaded(true)}
            className={`object-cover group-hover:scale-105 transition-all duration-700 ease-out-expo 
              ${!isImageLoaded ? 'opacity-0 scale-110' : 'opacity-100 scale-100'} 
              ${!product.inStock ? 'opacity-60 grayscale-[40%]' : ''}`}
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-ink-lighter bg-surface-100 relative z-10">
            <svg className="w-8 h-8 mb-2 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-[10px] font-medium uppercase tracking-widest text-ink-lighter">No Image</span>
          </div>
        )}
        
        {/* Sold Out Badge */}
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-ink text-surface-50 text-[10px] font-semibold px-3 py-1 rounded-sm uppercase tracking-widest z-20 shadow-sm">
            Sold Out
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className="text-base font-medium text-ink line-clamp-1 group-hover:text-ink-light transition-colors duration-300" title={product.title}>
            {product.title}
          </h3>
          <span className="text-sm font-semibold text-ink whitespace-nowrap">
            {formattedPrice}
          </span>
        </div>
        
        <p className="text-[11px] text-ink-lighter mb-3 font-medium uppercase tracking-widest">
          {product.brand}
        </p>
        
        <p className="text-sm text-ink-light line-clamp-2 mb-5 flex-grow font-light leading-relaxed">
          {product.description || 'No description available.'}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 mb-5 mt-auto">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-ink-lighter text-[11px] uppercase tracking-wider">
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="text-ink-lighter text-[11px] uppercase tracking-wider">
              +{product.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer Meta Data */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-100">
          <div className="flex items-center text-ink">
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1.5 text-xs font-medium">
              {formattedRating}
            </span>
          </div>
          <span className="text-xs text-ink-lighter font-light">
            {product.reviews} reviews
          </span>
        </div>
      </div>
    </div>
  );
};