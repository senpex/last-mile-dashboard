
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add this to your tailwind.config.js if not already there:
// animation: {
//   'fade-in': 'fadeIn 0.3s ease-in-out',
// },
// keyframes: {
//   fadeIn: {
//     '0%': { opacity: '0' },
//     '100%': { opacity: '1' },
//   },
// },
