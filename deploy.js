const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      // Skip node_modules and .git directories
      if (childItemName !== 'node_modules' && childItemName !== '.git') {
        copyRecursiveSync(
          path.join(src, childItemName),
          path.join(dest, childItemName)
        );
      }
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy build files to root
const buildDir = path.join(__dirname, 'build');
const itemsToCopy = ['index.html'];

// Copy index.html
itemsToCopy.forEach(item => {
  const src = path.join(buildDir, item);
  const dest = path.join(__dirname, item);
  
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Copied ${item} to root`);
  } else {
    console.warn(`⚠ ${item} not found in build directory`);
  }
});

// Ensure .nojekyll exists (needed for GitHub Pages to serve files correctly)
const nojekyllPath = path.join(__dirname, '.nojekyll');
if (!fs.existsSync(nojekyllPath)) {
  fs.writeFileSync(nojekyllPath, '');
  console.log('✓ Created .nojekyll file');
}

// Copy assets folder (JS/CSS from build)
const buildAssetsDir = path.join(buildDir, 'assets');
const rootAssetsDir = path.join(__dirname, 'assets');

if (fs.existsSync(buildAssetsDir)) {
  if (!fs.existsSync(rootAssetsDir)) {
    fs.mkdirSync(rootAssetsDir, { recursive: true });
  }
  copyRecursiveSync(buildAssetsDir, rootAssetsDir);
  console.log('✓ Copied build assets to root');
}

// Copy public assets folder (images) to root/assets
const publicAssetsDir = path.join(__dirname, 'public', 'assets');
if (fs.existsSync(publicAssetsDir)) {
  if (!fs.existsSync(rootAssetsDir)) {
    fs.mkdirSync(rootAssetsDir, { recursive: true });
  }
  copyRecursiveSync(publicAssetsDir, rootAssetsDir);
  console.log('✓ Copied public assets (images) to root');
}

console.log('Deployment files copied to root successfully!');

