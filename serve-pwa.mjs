import { execSync, spawn } from 'child_process';
import readline from 'readline';
import os from 'os';
import fs from 'fs';
import https from 'https';
import qrcode from 'qrcode-terminal';

// מחזיר true אם npm run dev כבר רץ
function isDevRunning() {
  try {
    const output = execSync('lsof -i :5173 || netstat -ano | findstr :5173', { stdio: 'pipe' }).toString();
    return output.includes('LISTEN');
  } catch {
    return false;
  }
}

// מפעיל את vite רק אם לא רץ
function runViteDev() {
  if (!isDevRunning()) {
    console.log('🔧 Starting Vite dev server...');
    spawn('npm', ['run', 'dev'], { stdio: 'inherit', shell: true });
  } else {
    console.log('✅ Vite is already running on port 5173.');
  }
}

// מפעיל את localtunnel
function runLocalTunnel() {
  return new Promise((resolve, reject) => {
    const lt = spawn('npx', ['localtunnel', '--port', '5173'], { shell: true });
    let url = '';

    lt.stdout.on('data', (data) => {
      const text = data.toString();
      const match = text.match(/https:\/\/[^\s]+\.loca\.lt/);
      if (match) {
        url = match[0];
        resolve({ url, lt });
      }
      process.stdout.write(text);
    });

    lt.stderr.on('data', (data) => {
      process.stderr.write(data.toString());
    });

    lt.on('error', reject);
  });
}

// מביא את הסיסמה מהשירות של loca.lt
function getTunnelPassword() {
  return new Promise((resolve, reject) => {
    https.get('https://loca.lt/mytunnelpassword', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data.trim()));
    }).on('error', reject);
  });
}

// מדפיס קוד QR יפה
function printQRCode(url) {
  console.log('\n📱 Scan this QR code from your phone to access the PWA:\n');
  qrcode.generate(url, { small: true });
}

// תפריט להרצת הכל
async function main() {
  runViteDev();
  const { url } = await runLocalTunnel();
  printQRCode(url);

  const pass = await getTunnelPassword();
  console.log(`\n🔐 Tunnel password (for one-time access): ${pass}\n`);
}

main();
