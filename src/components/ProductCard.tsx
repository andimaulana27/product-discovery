import React from 'react';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  // Safely parse price to ensure it is treated as a number at runtime.
  const parsedPrice = product.price !== null && product.price !== undefined ? Number(product.price) : null;
  const formattedPrice = parsedPrice !== null && !isNaN(parsedPrice) ? `$${parsedPrice.toFixed(2)}` : 'N/A';

  // Apply the same safety measure to the rating property.
  const parsedRating = product.rating !== null && product.rating !== undefined ? Number(product.rating) : null;
  const formattedRating = parsedRating !== null && !isNaN(parsedRating) ? parsedRating.toFixed(1) : '-';

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full overflow-hidden group">
      {/* Image Section with Next.js Image Optimization */}
      <div className="relative h-56 w-full bg-gray-50 flex-shrink-0">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={priority}
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-400 relative z-10">
            <svg className="w-10 h-10 mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs font-medium uppercase tracking-wider">No Image</span>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide z-20">
            Out of Stock
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1" title={product.title}>
            {product.title}
          </h3>
          <span className="text-sm font-bold text-blue-600 whitespace-nowrap ml-3">
            {formattedPrice}
          </span>
        </div>
        
        <p className="text-xs text-gray-400 mb-3 font-medium uppercase tracking-wide">{product.brand}</p>
        
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {product.description || 'No description available for this item at the moment.'}
        </p>

        {/* Tags Grid */}
        <div className="flex flex-wrap gap-1.5 mb-5 mt-auto">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 text-[10px] font-medium rounded-md">
              #{tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 text-[10px] font-medium rounded-md">
              +{product.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer Data */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
          <div className="flex items-center text-amber-400">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1.5 text-xs font-semibold text-gray-700">
              {formattedRating}
            </span>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            {product.reviews} reviews
          </span>
        </div>
      </div>
    </div>
  );
};