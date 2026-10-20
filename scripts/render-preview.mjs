import { createServer } from 'vite';

// Use Vite's preview server to serve prebuilt assets while retaining the
// upstream configurePreviewServer middleware hooks for provider endpoints.
const port = Number(process.env.PORT) || 4173;
const hostname = String(process.env.RENDER_EXTERNAL_HOSTNAME || '').trim();
if (!/^[a-z0-9.-]+\.onrender\.com$/i.test(hostname)) {
  console.error('Invalid Render hostname');
  process.exit(1);
}
process.env.GEV_ALLOWED_HOSTS = hostname;
process.env.GEV_KEY_SETUP_TRUSTED_PEERS = 'none';

const { preview } = await import('vite');
const server = await preview({ preview: { host: '0.0.0.0', port, strictPort: true, allowedHosts: [hostname] } });
server.printUrls();
for (const signal of ['SIGTERM', 'SIGINT']) process.once(signal, () => server.httpServer.close());
