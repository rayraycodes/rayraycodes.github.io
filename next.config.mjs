// This is a JS module that exports the configuration object for Next.js
// The configuration includes type support for better IntelliSense in supported editors.

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // React strict mode helps to identify potential problems in an application.
    reactStrictMode: true,
  
  
    // Static export configuration
    output: 'standalone',  // This enables support for static HTML export in Next.js
  
    // Additional configurations can be added as needed
  };
  
  module.exports = nextConfig;
  