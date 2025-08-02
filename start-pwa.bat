@echo off
chcp 65001 >nul
echo 🚀 Starting PWA Development Server...
echo.

echo 📱 Mobile Access URLs:
echo    Local:  https://localhost:5173
echo    Mobile: https://Ofek:5173
echo    Note: Accept the security warning for the self-signed certificate
echo.

echo 📋 Instructions:
echo 1. Make sure your phone is on the same WiFi network
echo 2. Open your mobile browser
echo 3. Go to: https://Ofek:5173
echo 4. Install the PWA using your browser's install option
echo.

echo 🔧 Installation by Browser:
echo    Chrome/Edge: Menu (⋮) → Install app
echo    Safari: Share button (📤) → Add to Home Screen
echo    Firefox: Menu (☰) → Install App
echo.

echo 💡 If Ofek doesn't work, try:
echo    - https://localhost:5173 (if on same computer)
echo    - Check your computer's IP address with: ipconfig
echo.

echo ⏳ Starting server... (Press Ctrl+C to stop)
echo.

npm run dev -- --host

