@echo off
chcp 65001 >nul
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4 Address" ^| findstr /v "169.254" ^| findstr /v "127."') ^
do (
  set ip=%%a
)
set ip=%ip: =%
echo 🚀 Starting PWA Development Server...
echo.
echo 📱 Mobile Access URLs:
echo    Local:  https://localhost:5173
echo    Mobile: https://%ip%:5173
echo.
echo 📋 Instructions:
echo 1. Make sure your phone is on the same WiFi network
echo 2. Open your mobile browser
echo 3. Go to: https://%ip%:5173
echo 4. Install the PWA using your browser's install option
echo 5. Install and trust the generated certificate if prompted
echo.
echo 🔧 Installation by Browser:
echo    Chrome/Edge: Menu (⋮) → Install app
echo    Safari: Share button (📤) → Add to Home Screen
echo    Firefox: Menu (☰) → Install App
echo.
echo 💡 If the IP doesn't work, try:
echo    - https://localhost:5173 (if on same computer)
echo    - Check your computer's IP address with: ipconfig
echo.
echo ⏳ Starting server... (Press Ctrl+C to stop)
echo.
npm run dev -- --host
