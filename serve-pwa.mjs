import { execSync, spawn } from 'child_process';
import fs from 'fs';
import https from 'https';
import { platform } from 'os';

// 🧠 Customize this if you want a fixed subdomain
const SUBDOMAIN = 'mypwaofek';

// Checks if the Vite dev server is already running
function isDevRunning() {
  try {
    const cmd = platform() === 'win32'
      ? 'netstat -ano | findstr :5173'
      : 'lsof -i :5173';
    const output = execSync(cmd, { stdio: 'pipe' }).toString();
    return output.includes('LISTEN') || output.includes('ESTABLISHED');
  } catch {
    return false;
  }
}

// Checks if a localtunnel process is already running
function isTunnelRunning() {
  try {
    const output = execSync('pgrep -f localtunnel', { stdio: 'pipe' }).toString();
    return !!output.trim();
  } catch {
    return false;
  }
}

// Starts the Vite dev server if it's not already running
function runViteDev() {
  if (!isDevRunning()) {
    console.log('🔧 Starting Vite dev server...');
    spawn('npm', ['run', 'dev'], { stdio: 'inherit', shell: true });
  } else {
    console.log('✅ Vite is already running on port 5173.');
  }
}

// Starts localtunnel with a fixed subdomain
function runLocalTunnel() {
  return new Promise((resolve, reject) => {
    const lt = spawn('npx', ['localtunnel', '--port', '5173', '--subdomain', SUBDOMAIN], { shell: true });

    lt.stdout.on('data', (data) => {
      const text = data.toString();
      const match = text.match(/https:\/\/[^\s]+\.loca\.lt/);
      if (match) {
        resolve({ url: match[0], lt });
      }
      process.stdout.write(text);
    });

    lt.stderr.on('data', (data) => {
      const text = data.toString();
      if (text.includes('already in use')) {
        console.log(`⚠️ Subdomain "${SUBDOMAIN}" is already in use.`);
        reject(new Error('Tunnel already running elsewhere.'));
      }
      process.stderr.write(text);
    });

    lt.on('error', reject);
  });
}

// Fetches the one-time access password from loca.lt
function getTunnelPassword() {
  return new Promise((resolve, reject) => {
    https.get('https://loca.lt/mytunnelpassword', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data.trim()));
    }).on('error', reject);
  });
}

// Prints a QR code to the terminal
async function printQRCode(url) {
  const qrcode = await import('qrcode-terminal');
  console.log('\n📱 Scan this QR code from your phone to access the PWA:\n');
  qrcode.default.generate(url, { small: true });
}

// Main entry point
async function main() {
  runViteDev();

  if (isTunnelRunning()) {
    console.log(`✅ LocalTunnel is already running (probably on https://${SUBDOMAIN}.loca.lt).`);
    await printQRCode(`https://${SUBDOMAIN}.loca.lt`);
  } else {
    try {
      const { url } = await runLocalTunnel();
      await printQRCode(url);
    } catch (err) {
      console.error(`❌ Failed to start localtunnel: ${err.message}`);
      return;
    }
  }

  try {
    const pass = await getTunnelPassword();
    console.log(`\n🔐 Tunnel password (for one-time access): ${pass}\n`);
  } catch (err) {
    console.error('⚠️ Could not fetch tunnel password:', err.message);
  }
}

main();
