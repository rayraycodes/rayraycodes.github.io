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
const itemsToCopy = ['index.html', 'assets'];

itemsToCopy.forEach(item => {
  const src = path.join(buildDir, item);
  const dest = path.join(__dirname, item);
  
  if (fs.existsSync(src)) {
    if (fs.statSync(src).isDirectory()) {
      // Remove existing directory if it exists
      if (fs.existsSync(dest)) {
        fs.rmSync(dest, { recursive: true, force: true });
      }
      fs.mkdirSync(dest, { recursive: true });
      copyRecursiveSync(src, dest);
    } else {
      fs.copyFileSync(src, dest);
    }
    console.log(`✓ Copied ${item} to root`);
  } else {
    console.warn(`⚠ ${item} not found in build directory`);
  }
});

console.log('Deployment files copied to root successfully!');

