/**
 * Root Layout
 * 
 * This is the root layout for the entire application.
 * It provides minimal setup as the locale-specific layout handles most styling.
 */

import './globals.css';

export const metadata = {
  title: 'Bea Borneo Travel',
  description: 'Discover the beauty of Borneo with our curated travel experiences.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return children;
}
