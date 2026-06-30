import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium E-commerce Color Palette
        surface: {
          DEFAULT: "#FAFAFA", // Warm off-white for page background
          50: "#FFFFFF",      // Pure white for cards
          100: "#F5F5F5",     // Subtle gray for borders/dividers
          200: "#E5E5E5",     // Hover states for backgrounds
        },
        ink: {
          DEFAULT: "#171717", // Elegant almost-black for primary text
          light: "#52525B",   // Soft gray for descriptions/secondary text
          lighter: "#A1A1AA", // Muted gray for placeholders/meta info
        }
      },
      transitionTimingFunction: {
        // Professional smooth easing curve for luxury feel
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      boxShadow: {
        // Custom subtle shadows for product cards
        'premium-sm': '0 2px 10px rgba(0, 0, 0, 0.02)',
        'premium-hover': '0 15px 35px -5px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
};

export default config;