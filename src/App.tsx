import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setIsInstallable(false);
    });
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    useEffect(() => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }

      const handler = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        setIsInstallable(true);
      };

      window.addEventListener("beforeinstallprompt", handler);

      window.addEventListener("appinstalled", () => {
        setIsInstalled(true);
        setIsInstallable(false);
      });

      return () => {
        window.removeEventListener("beforeinstallprompt", handler);
      };
    }, []);

    setDeferredPrompt(null);
    setIsInstallable(false);
  };

  return (
    <div className="App">
      <div className="glassy-panel">
        <div className="Title">
          <h1>PWA Playground</h1>
        </div>

        <p className="tagline">Test your PWA installation flow with beautiful UI</p>

        <div className="pwa-status">
          <h2>PWA Status</h2>
          <p>✅ Service Worker: Active</p>
          <p>✅ Manifest: Loaded</p>
          <p>
            📱 Installable: <strong>{isInstallable ? "Yes" : "No"}</strong>
          </p>
          <p>
            🏠 Installed: <strong>{isInstalled ? "Yes" : "No"}</strong>
          </p>
        </div>

        {isInstallable && !isInstalled && (
          <button id="green" className="button" onClick={handleInstallClick}>
            📲 Install App
          </button>
        )}

        <tfoot></tfoot>

        {isInstalled && (
          <div className="installed-message">
            <p>🎉 App is installed!</p>
            <p>You can now use it like a native app.</p>
          </div>
        )}
        <hr />

        <div className="instructions info">
          <h3>📱 How to install on mobile</h3>
          <ul>
            test test
            <li>
              <strong>Chrome / Edge:</strong> Menu (⋮) → Install app
            </li>
            <li>
              <strong>Safari:</strong> Share button (📤) → Add to Home Screen
            </li>
            <li>
              <strong>Firefox:</strong> Menu (☰) → Install App
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
