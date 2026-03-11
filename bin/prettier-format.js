#!/usr/bin/env node
'use strict';

// This wrapper resolves the TOML plugin path using CJS require.resolve(), which
// respects NODE_PATH set by pre-commit's node language environment. This avoids
// the issue where prettier v3's ESM import() cannot resolve bare plugin names
// from the user's project directory (where the plugin is not installed).

const { spawnSync } = require('child_process');

// Resolve prettier's bin path so it can be called even when not directly in PATH
// (e.g. when installed as a nested dependency in pre-commit's node environment).
const prettierBin = require.resolve('prettier/bin/prettier.cjs');

const pluginArgs = [];

try {
  const pluginPath = require.resolve('prettier-plugin-toml');
  pluginArgs.push(`--plugin=${pluginPath}`);
} catch (_) {
  // prettier-plugin-toml not found; TOML files will be skipped via --ignore-unknown
}

const result = spawnSync(
  process.execPath,
  [prettierBin, ...pluginArgs, ...process.argv.slice(2)],
  { stdio: 'inherit', env: process.env },
);

process.exit(result.status ?? 1);
