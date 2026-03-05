const fs = require('fs');
const path = require('path');

const depDir = path.join(__dirname, '..', 'dist', 'departamentos');
if (fs.existsSync(depDir)) {
  fs.rmSync(depDir, { recursive: true, force: true });
  console.log('Removed shapefiles from dist for lighter Tauri bundle');
} else {
  console.log('No departamentos dir in dist, skipping');
}
