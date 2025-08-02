# PWA Mobile Server Script
# סקריפט להרצת שרת PWA למובייל

Write-Host "🚀 Starting PWA Development Server..." -ForegroundColor Green
Write-Host ""

# Get local IP address
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Wi-Fi*" | Where-Object {$_.IPAddress -notlike "169.254.*" -and $_.IPAddress -notlike "127.*"} | Select-Object -First 1).IPAddress

if (-not $ipAddress) {
    $ipAddress = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias "Ethernet*" | Where-Object {$_.IPAddress -notlike "169.254.*" -and $_.IPAddress -notlike "127.*"} | Select-Object -First 1).IPAddress
}

if (-not $ipAddress) {
    Write-Host "❌ Could not find local IP address" -ForegroundColor Red
    Write-Host "Using localhost instead..." -ForegroundColor Yellow
    $ipAddress = "localhost"
}

Write-Host "📱 Mobile Access URLs:" -ForegroundColor Cyan
Write-Host "   Local:  https://localhost:5173" -ForegroundColor White
Write-Host "   Mobile: https://$ipAddress:5173" -ForegroundColor White
Write-Host "   Note: Accept the security warning for the self-signed certificate" -ForegroundColor Yellow
Write-Host ""

Write-Host "📋 Instructions:" -ForegroundColor Yellow
Write-Host "1. Open your mobile browser" -ForegroundColor White
Write-Host "2. Go to: https://$ipAddress:5173" -ForegroundColor White
Write-Host "3. Install the PWA using your browser's install option" -ForegroundColor White
Write-Host ""

Write-Host "🔧 Installation by Browser:" -ForegroundColor Yellow
Write-Host "   Chrome/Edge: Menu (⋮) → Install app" -ForegroundColor White
Write-Host "   Safari: Share button (📤) → Add to Home Screen" -ForegroundColor White
Write-Host "   Firefox: Menu (☰) → Install App" -ForegroundColor White
Write-Host ""

Write-Host "⏳ Starting server... (Press Ctrl+C to stop)" -ForegroundColor Green
Write-Host ""

# Start the development server
npm run dev -- --host

