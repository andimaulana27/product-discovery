# Curated Collection - Premium Product Discovery

A modern, highly-polished e-commerce product discovery interface built with Next.js and TypeScript. This project focuses heavily on the "last 20%" of product engineering: smooth interactions, intelligent rendering, and a premium user experience (UX).

## 🚀 Product Decisions & Engineering Philosophy

As a product-minded engineer, I made several intentional architectural decisions to balance Developer Experience (DX) with an uncompromising User Experience (UX):

1. **Concurrent Rendering (`useTransition`)**
   Handling large datasets (like 4,000+ items) purely on the client-side can freeze the browser during heavy filter computations or DOM updates. I implemented React 18's `useTransition` to keep the UI perfectly responsive. When users switch categories, they see an elegant, non-blocking blur/fade transition instead of a frozen screen.

2. **Strategic Image Optimization (DX vs. UX)**
   Next.js `<Image>` optimization is fantastic for production but can cause massive local bottlenecks when dynamically rendering dozens of new images during category switches. I bypassed this specifically for `NODE_ENV === 'development'` to allow instant local iteration, while guaranteeing 100% optimization when deployed to production.

3. **The "Polish" (Semantic Design & Micro-interactions)**
   - **Semantic Tailwind Palette:** Replaced hardcoded grays with a scalable `surface` and `ink` color system.
   - **Custom Easing:** Implemented `ease-out-expo` for luxurious, weightless hover states.
   - **Custom Dropdown:** Completely replaced the native HTML `<select>` with a custom React dropdown (with click-outside detection and directional awareness) to maintain brand aesthetics across all operating systems.
   - **Skeleton Loaders:** Added built-in pulse skeletons that gracefully fade into the high-resolution images upon load.

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Library:** React 18
- **Language:** TypeScript (Strict typing for robust state management)
- **Styling:** Tailwind CSS
- **Data Handling:** Custom generic hooks (`useDebounce`, `useProductFilter`)

## ✨ Key Features

- **Multi-dimensional Search:** Real-time filtering by title, brand, and tags simultaneously.
- **Dynamic Categories:** Automatically extracts and builds category filters from the raw dataset.
- **Flawless Pagination:** Prevents "empty state" bugs by safely resetting to page 1 during new searches, without cascading `useEffect` renders.
- **Empty States:** Premium, helpful empty states when a search yields no results.

## 📂 Folder Structure

    src/
    ├── app/
    │   ├── globals.css        # Tailwind directives and core layers
    │   ├── layout.tsx         # Global layout and semantic background injection
    │   └── page.tsx           # Main discovery interface
    ├── components/
    │   ├── CategoryFilter.tsx # Dynamic scrollable category pills
    │   ├── Pagination.tsx     # Custom logic & dropdown pagination
    │   ├── ProductCard.tsx    # High-performance card with skeleton loaders
    │   ├── ProductGrid.tsx    # Responsive grid and empty states
    │   └── SearchBar.tsx      # Debounced search input
    ├── data/
    │   └── items.json         # Raw catalog data
    ├── hooks/
    │   ├── useDebounce.ts     # Prevents rapid-fire search renders
    │   └── useProductFilter.ts# Core filtering, transition, and pagination logic
    └── types/
        └── product.ts         # Strict interfaces

## ⚖️ Trade-offs & Next Steps

Building a purely client-side filtering experience provides lightning-fast interactions for 4,000 items. However, I am highly aware of the following tradeoff:

- **The Trade-off (Bundle Size):** Sending 4,000+ JSON records directly to the client increases the initial JS payload. While acceptable for this MVP, if the catalog scales to 50,000+ items, it will severely degrade the initial page load performance.
- **What I'd Do Next:** To scale this, I would migrate the dataset to a PostgreSQL database (like Supabase), implement full-text search on the backend, and transition the application to use server-side pagination via API routes. This ensures the frontend remains lightweight while handling an infinitely scaling catalog.

## 💻 Getting Started

First, install the dependencies:

    npm install

Then, run the development server:

    npm run dev

Open http://localhost:3000 with your browser to see the result.
