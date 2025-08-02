import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

const https = {
  key: `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKr+zKM1/ydXzv
f2cfZNDacr5Letnk286hPcEXmyX7z1V2l0+GfI7qALAm87xTHFXTgAc1d5iGPx0D
4uJu5Spv0sZu5hyEOOtj8eZrAeqe8bqHilsxHT9PdPyU+CwOF/Wq/2A3hkLgvej6
dzU8pxrDA9ZbA9XvNfZIy2RbRqF3AChV3Sr6k/Rs1ux/M/zZP5WoXphd85ICRZJ9
AZlfH3eA9vF86SzkBEY8ePvmRm8arug1YwCEEMx2tiUtOVCwt+BvpjfhK2ooKaRP
oPwPOrzyvI6U5PJyiid7IrOGK5mASy1daXxOt+GsqOa7y6BkW+wFYIIPUNuycvDj
D25rrl1hAgMBAAECggEAFNl69KPLQ2AljWdgHsEaoNX70DzfbCTWQQzer4R0qE4A
HxZahl2Kv/R5KlCZNz1rcLmzRCM8y9ZzMCKnIzwsnNskMWU3WryWLi5Egw5r6ZS5
GNc5ITi+efhxQQu0UHDTgxcI+T005PR0Ikuf7NDNtnDPHIas+5Hj90IA3UjLNDff
gX6GfrZDFxgJzaXbvbiiMmiMl3vPaW7fBBgMQiX/DaBpuHeQI0ryz2Nlt7MSTsp1
wX31Qd1pmGqYUIuRPoUUkz1AvT0vyqjLxCCHMxTkfLTfqkbpJ4PavCNwlJ0CK05Q
e5NE70WsS0kirMi4LlcMr1Lw5Fjp4Q9gRrVKe1GUiQKBgQDvt5XB2yrRz2mbLFw5
93aTAuJIQEDj4W54uuqHUUvV2FVlhesEcwzqu753IVepMrpaLhHewLGPVa02Lkzj
SZWxTI7JRik6qgC0GhyDRzxOemYikQ9oUnuZxTVEuede19yORNOg5B1IwV3wsCSv
4vKcAfL9bh60cT+xU8Yqy1VXfQKBgQDYdG5CGH1dHnT5KRWkyOXuMitCC6UqXn+0
uve1tqEZiYNJl104pH5LEQCADo2FpAdx6S033uCnogZEQrEyQWTwOK+mj2Qx0KeQ
iYEUaZZwFIdk2eiCkj5aXtP7aaU0Drvn8+5fntUrWPHWllrvtK+ocKeNgSwlF1fr
C8L2eoEqtQKBgQDRM1xEg+qIlARL4ZjTFb2rarbj6v82YIQyZJ1MXoxaIaPVJ9wE
VAuPxyzfdn+0L4smLFJ4HZ5XwqOZRyreqFc1FeT+jnZotfhLNQZxIvfkXTlJLWNO
3bz0Y4Cra7oZsTTQDAzMuoc7+VTsOiyqOtsTfzf6J+IwAy1cqgmlSzI9WQKBgBre
QP11WsJfUHfJMMWWpmvt0E7PcT4UItgFSVBGDjNETYaqAklQqdiZkK1UoR6QoNfz
8Mf5o3tLcmmwuZwaX/QtpSgQrog8dUBMwTgObz0UX0YWgnUKwDCpirivgXE3zv1Y
2yMFbUKHNOXFHh6ZGCDZcwLuoNMt1Zz4hcfgpv3tAoGBAMTzDsYtHLViebsEfqSG
vn3sfxSKJ8TSn2bNK3aI8GjrB4vsUSVRQY2G3PNCAIYnqIG58JehozTbtde7Gwrt
WLBB5YGlTlpKSK3b0zo69BvyrtUL8df6FMQVBeZB5u7MX1VQmMyf6Z8viN160G8o
a7P1aIjz+w1uzphYHTBse2Y/
-----END PRIVATE KEY-----`,
  cert: `-----BEGIN CERTIFICATE-----
MIIDCTCCAfGgAwIBAgIUCXSr5WXU5B6GKypKCIdzSOgE9OwwDQYJKoZIhvcNAQEL
BQAwFDESMBAGA1UEAwwJbG9jYWxob3N0MB4XDTI1MDgwMTIzMDQwOFoXDTI2MDgw
MTIzMDQwOFowFDESMBAGA1UEAwwJbG9jYWxob3N0MIIBIjANBgkqhkiG9w0BAQEF
AAOCAQ8AMIIBCgKCAQEAyq/syjNf8nV8739nH2TQ2nK+S3rZ5NvOoT3BF5sl+89V
dpdPhnyO6gCwJvO8UxxV04AHNXeYhj8dA+LibuUqb9LGbuYchDjrY/HmawHqnvG6
h4pbMR0/T3T8lPgsDhf1qv9gN4ZC4L3o+nc1PKcawwPWWwPV7zX2SMtkW0ahdwAo
Vd0q+pP0bNbsfzP82T+VqF6YXfOSAkWSfQGZXx93gPbxfOks5ARGPHj75kZvGq7o
NWMAhBDMdrYlLTlQsLfgb6Y34StqKCmkT6D8Dzq88ryOlOTycooneyKzhiuZgEst
XWl8TrfhrKjmu8ugZFvsBWCCD1DbsnLw4w9ua65dYQIDAQABo1MwUTAdBgNVHQ4E
FgQURIa+lTNRIODSNsO1Oc8lNvFQZ08wHwYDVR0jBBgwFoAURIa+lTNRIODSNsO1
Oc8lNvFQZ08wDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAb2Tl
/rIb7Npv8Yz9FcVnRQZaKGKp27N5wzqRMKgcqitsQzNkrF6wGULPsMs6v77VZg8P
MBRJqOQVsBWneQTRqB64GjI4gaNDdpsHRw1E2f3vGEPtFO0raPeYl1h2GpZO6ySh
SqBGghHj5IdX8Fj6IGj/2z7O0FKpVFbm5uvRHVtxDlfD+zfZooelodZRArP6Fur5
0vkvVimPx0wvUxZcTnv7nYC+73JBaaAxRJDZJzdfzwWnqMzpr48erYp0NudcMziM
GmBfpvanRyjB5/8IEwJ+wBznowlDQsrCmdZlKBW8jWPvwoyoaLZlycMw1w/GTybA
Vm1uZZWMFKZyWbIzkA==
-----END CERTIFICATE-----`,
};

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Camera PWA',
        short_name: 'CamPWA',
        description: 'A Progressive Web App for camera functionality',
        theme_color: '#3367D6',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        scope: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      }
    }),
  ],
  optimizeDeps: {
    force: true,
  },
  server: {
    host: true,
    https,
    hmr: {
      overlay: false,
    },
  },
});

