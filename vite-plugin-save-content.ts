import type { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';

export function saveContentPlugin(): Plugin {
  return {
    name: 'save-content',
    configureServer(server) {
      server.middlewares.use('/api/save-content', async (req, res, next) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        let body = '';
        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const content = JSON.parse(body);
            const contentTsPath = path.resolve(__dirname, 'src/data/content.ts');
            
            const fileContent = `// Centralized content data for the portfolio website
// Edit this file directly to update content across all pages

const contentData = ${JSON.stringify(content, null, 2)};

export default contentData;
`;

            fs.writeFileSync(contentTsPath, fileContent, 'utf-8');
            
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: true, message: 'Content saved successfully' }));
          } catch (error: any) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ success: false, error: error.message }));
          }
        });
      });
    },
  };
}

