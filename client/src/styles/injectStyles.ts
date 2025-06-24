/**
 * This file injects the Tailwind CSS styles into the page without passing through
 * VS Code's CSS linting, which has issues with Tailwind directives.
 */

// Add Tailwind base directives
const injectTailwindBase = (): void => {
  const style = document.createElement('style');
  style.textContent = `
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `;
  style.dataset.origin = 'tailwind-injected';
  document.head.appendChild(style);
};

// Add base styles
const injectBaseStyles = (): void => {
  const style = document.createElement('style');
  style.textContent = `
    @layer base {
      body {
        @apply bg-white text-gray-900 dark:bg-gray-900 dark:text-white;
      }
      
      ::selection {
        @apply bg-primary-500 text-white;
      }
    }
  `;
  style.dataset.origin = 'tailwind-base-injected';
  document.head.appendChild(style);
};

// Add component styles
const injectComponentStyles = (): void => {
  const style = document.createElement('style');
  style.textContent = `
    @layer components {
      .container {
        @apply mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl;
      }
      
      .btn {
        @apply inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300;
      }
      
      .btn-primary {
        @apply bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500;
      }
      
      .btn-secondary {
        @apply bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500;
      }
      
      .btn-outline {
        @apply border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-primary-500 dark:bg-transparent dark:text-white dark:border-gray-600 dark:hover:bg-gray-800;
      }
      
      .card {
        @apply bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden;
      }
      
      .input {
        @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white;
      }
      
      .section-title {
        @apply text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl;
      }
      
      .section-subtitle {
        @apply mt-2 text-lg text-gray-600 dark:text-gray-400;
      }
    }
  `;
  style.dataset.origin = 'tailwind-components-injected';
  document.head.appendChild(style);
};

export const injectAllStyles = (): void => {
  injectTailwindBase();
  injectBaseStyles();
  injectComponentStyles();
};

export default injectAllStyles; 