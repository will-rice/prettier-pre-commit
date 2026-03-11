'use strict';

// Runs after `npm install -g` in pre-commit's isolated nodeenv.
// Resolves the absolute paths to prettier and prettier-plugin-toml once,
// then writes them into bin/prettier-format.js so the hook can invoke
// prettier with --plugin=/absolute/path on every run without re-resolving.

const fs = require('fs');
const path = require('path');

let pluginPath, prettierBin;

try {
  pluginPath = require.resolve('prettier-plugin-toml');
  prettierBin = require.resolve('prettier/bin/prettier.cjs');
} catch (e) {
  // Dependencies not yet installed (e.g. initial `npm install --no-save`
  // before `npm pack`). The runtime wrapper in bin/ handles this case.
  process.exit(0);
}

const wrapper = `#!/usr/bin/env node
'use strict';
const { spawnSync } = require('child_process');
const result = spawnSync(
  process.execPath,
  [${JSON.stringify(prettierBin)}, ${JSON.stringify('--plugin=' + pluginPath)}, ...process.argv.slice(2)],
  { stdio: 'inherit', env: process.env },
);
process.exit(result.status ?? 1);
`;

const binPath = path.join(__dirname, '..', 'bin', 'prettier-format.js');
fs.writeFileSync(binPath, wrapper, { mode: 0o755 });
fs.chmodSync(binPath, 0o755);
