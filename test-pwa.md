# PWA Mobile Testing Guide

## Quick Start

1. **Start the dev server with network access:**
   ```bash
   npm run dev -- --host
   ```

2. **Find your computer's IP address:**
   - Windows: `ipconfig` (look for IPv4 Address)
   - Mac/Linux: `ifconfig` or `ip addr`

3. **Access on mobile:**
   - Open your mobile browser
   - Go to: `https://YOUR_IP_ADDRESS:5173`
   - Example: `https://192.168.1.100:5173`
   - If prompted, install and trust the generated certificate

## Installation Methods

### Chrome/Edge (Android)
1. Open the website
2. Tap the menu (⋮) → "Install app"
3. Or look for the install button in the address bar

### Safari (iOS)
1. Open the website
2. Tap the share button (📤)
3. Select "Add to Home Screen"
4. Tap "Add"

### Firefox
1. Open the website
2. Tap the menu (☰)
3. Select "Install App"

## PWA Features You'll Get

✅ **App-like experience** - No browser UI
✅ **Home screen icon** - Like a native app
✅ **Offline support** - Works without internet
✅ **Auto-updates** - Updates automatically
✅ **Full-screen mode** - Immersive experience

## Troubleshooting

- **Can't install?** Make sure you're using HTTPS or localhost
- **No install button?** Check that your manifest.json is valid
- **Icons not showing?** Replace the placeholder icon files with real PNG images

## Next Steps

1. Replace the placeholder icon files with real images
2. Test offline functionality
3. Add more PWA features like push notifications
