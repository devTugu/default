#!/usr/bin/env node
/**
 * Ensures lightningcss native binding is resolvable (npm/yarn/turbopack).
 * 1. Copies platform .node next to lightningcss/ (fallback path)
 * 2. Verifies require('lightningcss') works
 */
const fs = require('node:fs');
const path = require('node:path');

function platformPackageId() {
  let parts = [process.platform, process.arch];
  if (process.platform === 'linux') {
    try {
      const { familySync, MUSL } = require('detect-libc');
      const family = familySync();
      if (family === MUSL) {
        parts.push('musl');
      } else if (process.arch === 'arm') {
        parts.push('gnueabihf');
      } else {
        parts.push('gnu');
      }
    } catch {
      parts.push('gnu');
    }
  } else if (process.platform === 'win32') {
    parts.push('msvc');
  }
  return {
    pkgName: `lightningcss-${parts.join('-')}`,
    nodeFile: `lightningcss.${parts.join('-')}.node`,
  };
}

function ensureNativeBinding() {
  const root = path.join(__dirname, '..');
  const { pkgName, nodeFile } = platformPackageId();
  const platformPkgDir = path.join(root, 'node_modules', pkgName);
  const platformNode = path.join(platformPkgDir, nodeFile);
  const lightningcssDir = path.join(root, 'node_modules', 'lightningcss');
  const fallbackNode = path.join(lightningcssDir, nodeFile);

  if (!fs.existsSync(platformNode)) {
    console.warn(
      `[verify-lightningcss] Optional platform package missing: ${pkgName}`,
    );
    console.warn(
      'Run: rm -rf node_modules .next && npm ci  (use npm, not yarn)',
    );
    return false;
  }

  if (!fs.existsSync(fallbackNode)) {
    try {
      fs.copyFileSync(platformNode, fallbackNode);
    } catch (error) {
      console.warn(
        `[verify-lightningcss] Could not copy native binding: ${error instanceof Error ? error.message : error}`,
      );
    }
  }

  return true;
}

try {
  if (!ensureNativeBinding()) {
    process.exit(1);
  }
  require('lightningcss');
  require('@tailwindcss/postcss');
  process.exit(0);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error('\n[verify-lightningcss] Native binding failed:', message);
  console.error(
    '\nFix:\n' +
      '  rm -rf node_modules .next yarn.lock\n' +
      '  npm ci\n' +
      '  npm run dev\n' +
      '\nUse npm (not yarn) — package-lock.json is the source of truth.\n' +
      'If Turbopack still fails: npm run dev:webpack\n',
  );
  process.exit(1);
}
