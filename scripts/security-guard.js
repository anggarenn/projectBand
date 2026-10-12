const ALLOWED_USERS = new Set(['anggarrrr']);
const SAFE_ROOT = 'd:\\ren';
const BLOCKED_PATTERNS = [
  /format\s+/i,
  /rmdir\s+(\/s|\-r)/i,
  /del\s+.*[c-z]:/i,
  /drop\s+(database|table)/i,
  /shutdown/i,
  /reg\s+delete/i,
  /\.ssh/i,
  /metrodata/i
];

export function verifyRequest({ username, targetPath, shellCommand }) {
  const cleanUser = (username || '').toLowerCase().replace(/^@/, '');
  if (!ALLOWED_USERS.has(cleanUser)) {
    throw new Error(`AUTH_BLOCKED: User @${username} tidak diizinkan`);
  }

  if (targetPath) {
    const normalized = targetPath.toLowerCase().replace(/\//g, '\\');
    if (!normalized.startsWith(SAFE_ROOT) || normalized.includes('.ssh') || normalized.includes('metrodata')) {
      throw new Error(`JAIL_BLOCKED: Akses path di luar ${SAFE_ROOT} ditolak`);
    }
  }

  if (shellCommand) {
    for (const pattern of BLOCKED_PATTERNS) {
      if (pattern.test(shellCommand)) {
        throw new Error('COMMAND_BLOCKED: Perintah berbahaya terdeteksi');
      }
    }
  }

  return true;
}