import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple base64 encoded PNGs (1x1 pixel blue squares)
const icon192Base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';
const icon512Base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

// Write the files
fs.writeFileSync(path.join(__dirname, 'public', 'pwa-192x192.png'), Buffer.from(icon192Base64, 'base64'));
fs.writeFileSync(path.join(__dirname, 'public', 'pwa-512x512.png'), Buffer.from(icon512Base64, 'base64'));

console.log('✅ PWA icons created successfully!');
console.log('📁 Files created:');
console.log('   - public/pwa-192x192.png');
console.log('   - public/pwa-512x512.png');
console.log('');
console.log('💡 Note: These are placeholder icons. Replace them with real images for production.'); 