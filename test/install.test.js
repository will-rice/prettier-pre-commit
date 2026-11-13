'use strict';

// Installs this repo the way pre-commit's `language: node` does
// (pre_commit/languages/node.py: `npm install --install-links -g <repo>` with
// npm_config_prefix pointing at the hook env), then runs the installed hook.

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const REPO = path.join(__dirname, '..');

test('installed hook runs its committed entrypoint and formats TOML', () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'prettier-pre-commit-'));
  try {
    const envDir = path.join(tmp, 'env');
    const install = spawnSync(
      'npm',
      ['install', '--install-links', '-g', REPO],
      {
        encoding: 'utf8',
        env: { ...process.env, npm_config_prefix: envDir, NPM_CONFIG_PREFIX: envDir },
      },
    );
    assert.equal(install.status, 0, install.stderr);

    const installedPkg = path.join(envDir, 'lib', 'node_modules', 'prettier-pre-commit');
    assert.equal(
      fs.readFileSync(path.join(installedPkg, 'bin', 'prettier-format.js'), 'utf8'),
      fs.readFileSync(path.join(REPO, 'bin', 'prettier-format.js'), 'utf8'),
      'install rewrote the hook entrypoint',
    );

    const project = path.join(tmp, 'project');
    fs.mkdirSync(project);
    const toml = path.join(project, 'a.toml');
    fs.writeFileSync(toml, '[section]\nkey    =    "value"\n');
    const run = spawnSync(
      path.join(envDir, 'bin', 'prettier-format'),
      ['--write', '--ignore-unknown', toml],
      {
        cwd: project,
        encoding: 'utf8',
        env: { ...process.env, NODE_PATH: path.join(envDir, 'lib', 'node_modules') },
      },
    );
    assert.equal(run.status, 0, run.stderr);
    assert.equal(fs.readFileSync(toml, 'utf8'), '[section]\nkey = "value"\n');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});
