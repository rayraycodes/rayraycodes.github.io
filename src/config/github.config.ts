/**
 * GitHub API Configuration for Comments
 * 
 * To set up:
 * 1. Create a GitHub Personal Access Token with 'gist' scope
 *    - Go to: https://github.com/settings/tokens
 *    - Click "Generate new token (classic)"
 *    - Select "gist" scope
 *    - Copy the token
 * 2. Create a gist to store comments:
 *    - Go to: https://gist.github.com
 *    - Create a new gist (can be private or public)
 *    - Name the file: comments.json
 *    - Initial content: {}
 *    - Copy the gist ID from the URL
 * 3. Update the values below
 */

export const githubConfig = {
  // Your GitHub username
  username: 'rayraycodes',
  
  // Gist ID where comments will be stored
  // Get this from the gist URL: https://gist.github.com/rayraycodes/{GIST_ID}
  gistId: 'af23f94667a5b844d5dc43b3b89321d7',
  
  // GitHub Personal Access Token (with 'gist' scope) - REQUIRED
  // Set via environment variable: VITE_GITHUB_TOKEN
  // 
  // For local development:
  // 1. Copy .env.example to .env
  // 2. Add your token: VITE_GITHUB_TOKEN=your_token_here
  // 
  // For production (GitHub Pages):
  // The token is injected via GitHub Actions using the GIST_TOKEN secret
  // Set up in: Repository Settings > Secrets and variables > Actions
  // 
  // Note: This token will be visible in client-side code, so use a token with minimal permissions
  token: import.meta.env.VITE_GITHUB_TOKEN || '',
  
  // Gist filename
  filename: 'comments.json',
};

