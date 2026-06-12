
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';
  import { saveContentPlugin } from './vite-plugin-save-content';
  import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs';
  import contentData from './src/data/content';

  // Plugin to copy assets from src/assets to public/assets during build
  function copyAssetsPlugin() {
    return {
      name: 'copy-assets',
      buildStart() {
        const srcAssets = path.resolve(__dirname, 'src/assets');
        const publicAssets = path.resolve(__dirname, 'public/assets');
        
        if (existsSync(srcAssets)) {
          if (!existsSync(publicAssets)) {
            mkdirSync(publicAssets, { recursive: true });
          }
          
          const copyRecursive = (src: string, dest: string) => {
            const entries = readdirSync(src, { withFileTypes: true });
            for (const entry of entries) {
              const srcPath = path.join(src, entry.name);
              const destPath = path.join(dest, entry.name);
              
              if (entry.isDirectory()) {
                if (!existsSync(destPath)) {
                  mkdirSync(destPath, { recursive: true });
                }
                copyRecursive(srcPath, destPath);
              } else {
                copyFileSync(srcPath, destPath);
              }
            }
          };
          
          try {
            copyRecursive(srcAssets, publicAssets);
            console.log('✓ Assets copied to public/assets');
          } catch (error) {
            console.warn('Warning: Could not copy assets:', error);
          }
        }
      },
    };
  }

  // Plugin to ensure public/assets images are copied to build/assets
  function copyPublicAssetsPlugin() {
    return {
      name: 'copy-public-assets',
      writeBundle() {
        const publicAssets = path.resolve(__dirname, 'public/assets');
        const buildAssets = path.resolve(__dirname, 'build/assets');
        
        if (existsSync(publicAssets)) {
          if (!existsSync(buildAssets)) {
            mkdirSync(buildAssets, { recursive: true });
          }
          
          const copyRecursive = (src: string, dest: string) => {
            const entries = readdirSync(src, { withFileTypes: true });
            for (const entry of entries) {
              const srcPath = path.join(src, entry.name);
              const destPath = path.join(dest, entry.name);
              
              // Skip if it's a JS or CSS file (already handled by Vite)
              if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.css'))) {
                continue;
              }
              
              if (entry.isDirectory()) {
                if (!existsSync(destPath)) {
                  mkdirSync(destPath, { recursive: true });
                }
                copyRecursive(srcPath, destPath);
              } else {
                copyFileSync(srcPath, destPath);
              }
            }
          };
          
          try {
            copyRecursive(publicAssets, buildAssets);
            console.log('✓ Public assets copied to build/assets');
          } catch (error) {
            console.warn('Warning: Could not copy public assets:', error);
          }
        }
      },
    };
  }

  // Plugin to generate static share pages per story so link previews
  // (Slack, WhatsApp, Facebook, X) show the story title/image. Crawlers
  // never see hash routes, so each story gets a real path containing the
  // right meta tags and an instant redirect into the SPA hash route.
  function generateSharePagesPlugin() {
    const SITE_ORIGIN = 'https://reganmaharjan.com.np';

    const escapeHtml = (s: string) =>
      s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

    const firstImage = (story: any): string => {
      const imgs = story.content?.images || [];
      let url = imgs.length > 0 ? (typeof imgs[0] === 'string' ? imgs[0] : imgs[0].url) : '/assets/raylogo.png';
      // Crawlers don't render SVG og:images; use a PNG twin when available.
      if (url.endsWith('.svg')) {
        const pngTwin = url.replace(/\.svg$/, '.png');
        if (existsSync(path.resolve(__dirname, 'public' + pngTwin))) {
          url = pngTwin;
        } else {
          url = '/assets/raylogo.png';
        }
      }
      return SITE_ORIGIN + url;
    };

    const sharePage = (story: any, routeBase: string) => {
      const title = escapeHtml(story.thumbnailTitle || story.title);
      const fullTitle = escapeHtml(story.title);
      const desc = escapeHtml(story.excerpt || '');
      const img = firstImage(story);
      const cleanUrl = `${SITE_ORIGIN}/${routeBase}/${story.id}`;
      const hashRoute = `/#/${routeBase}/${story.id}`;
      return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${fullTitle}</title>
<meta name="description" content="${desc}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${desc}" />
<meta property="og:image" content="${img}" />
<meta property="og:url" content="${cleanUrl}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${title}" />
<meta name="twitter:description" content="${desc}" />
<meta name="twitter:image" content="${img}" />
<link rel="canonical" href="${cleanUrl}" />
<meta http-equiv="refresh" content="0;url=${hashRoute}" />
<script>window.location.replace('${hashRoute}');</script>
</head>
<body>
<p>Redirecting to <a href="${hashRoute}">${fullTitle}</a>…</p>
</body>
</html>
`;
    };

    return {
      name: 'generate-share-pages',
      writeBundle() {
        const out = path.resolve(__dirname, 'build');
        const emit = (story: any, routeBase: string) => {
          const dir = path.join(out, routeBase, story.id);
          mkdirSync(dir, { recursive: true });
          writeFileSync(path.join(dir, 'index.html'), sharePage(story, routeBase));
        };
        try {
          (contentData as any).storiesOfAdventure.stories.forEach((s: any) => emit(s, 'storiesofadventure'));
          (contentData as any).impact.stories.forEach((s: any) => emit(s, 'impact'));
          console.log('✓ Share pages generated for stories');
        } catch (error) {
          console.warn('Warning: Could not generate share pages:', error);
        }
      },
    };
  }

  export default defineConfig({
    plugins: [react(), saveContentPlugin(), copyAssetsPlugin(), copyPublicAssetsPlugin(), generateSharePagesPlugin()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/eb2091338e5a526e6c52dbe7891867bad0365a67.png': path.resolve(__dirname, './src/assets/eb2091338e5a526e6c52dbe7891867bad0365a67.png'),
        'figma:asset/cc03d6b7b9b6c0b127b5885a899b19b8d05b9f15.png': path.resolve(__dirname, './src/assets/cc03d6b7b9b6c0b127b5885a899b19b8d05b9f15.png'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
    },
  });