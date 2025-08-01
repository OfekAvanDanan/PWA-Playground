import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    // Listen for appinstalled event
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setIsInstallable(false);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📱 Camera PWA</h1>
        
        <div className="pwa-status">
          <h2>PWA Status:</h2>
          <p>✅ Service Worker: Active</p>
          <p>✅ Manifest: Loaded</p>
          <p>📱 Installable: {isInstallable ? 'Yes' : 'No'}</p>
          <p>🏠 Installed: {isInstalled ? 'Yes' : 'No'}</p>
        </div>

        {isInstallable && !isInstalled && (
          <button 
            onClick={handleInstallClick}
            className="install-button"
          >
            📱 Install App
          </button>
        )}

        {isInstalled && (
          <div className="installed-message">
            <p>🎉 App is installed!</p>
            <p>You can now use it like a native app.</p>
          </div>
        )}

        <div className="instructions">
          <h3>How to install on mobile:</h3>
          <ul>
            <li><strong>Chrome/Edge:</strong> Menu (⋮) → Install app</li>
            <li><strong>Safari:</strong> Share button (📤) → Add to Home Screen</li>
            <li><strong>Firefox:</strong> Menu (☰) → Install App</li>
          </ul>
        </div>

        <div className="camera-section">
          <h2>📸 Camera Feature</h2>
          <p>Your camera functionality will go here...</p>
        </div>
      </header>
    </div>
  );
}

export default App;
