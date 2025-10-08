# prettier-pre-commit

A minimal pre-commit hook that uses prettier to format config files in Python projects.

## Features

- Automatically formats JSON, YAML, Markdown, and TOML files using prettier
- Uses `npx` to run prettier without requiring a local installation
- Compatible with the [pre-commit](https://pre-commit.com/) framework

## Requirements

- Python 3.7 or higher
- Node.js and npm (for `npx` to run prettier)

## Usage

Add this to your `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/will-rice/prettier-pre-commit
    rev: v0.1.0  # Use the latest version
    hooks:
      - id: prettier
```

Then run:

```bash
pre-commit install
```

Now prettier will automatically format your config files when you commit!

## Supported File Types

- JSON (`.json`)
- YAML (`.yaml`, `.yml`)
- Markdown (`.md`)
- TOML (`.toml`)

## Configuration

You can customize prettier's behavior by adding a `.prettierrc` file to your project root. See [prettier's documentation](https://prettier.io/docs/en/configuration.html) for configuration options.

## License

MIT
