// Render launcher: preserve the upstream Docker entrypoint and restrict its host allowlist.
import { spawn } from 'node:child_process';

const hostname = String(process.env.RENDER_EXTERNAL_HOSTNAME || '').trim();
if (!hostname || !/^[a-z0-9.-]+\.onrender\.com$/i.test(hostname)) {
  console.error('[Render] Missing or invalid RENDER_EXTERNAL_HOSTNAME; refusing public startup.');
  process.exit(1);
}

const env = {
  ...process.env,
  GEV_ALLOWED_HOSTS: hostname,
  GEV_KEY_SETUP_TRUSTED_PEERS: 'none',
};
const child = spawn(process.execPath, ['scripts/docker-start.mjs'], {
  cwd: process.cwd(), env, stdio: 'inherit',
});
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => child.kill(signal));
child.on('exit', (code, signal) => { process.exitCode = code ?? (signal ? 1 : 0); });
child.on('error', (err) => { console.error('[Render] Launch failed:', err.message); process.exitCode = 1; });
