# prettier-pre-commit

A minimal [pre-commit](https://pre-commit.com/) hook that uses [Prettier](https://prettier.io/) to format configuration files in Python projects.

## Features

- Formats JSON, YAML, Markdown, and TOML files
- No system Node.js installation required (uses isolated nodeenv)
- Includes TOML support via `prettier-plugin-toml`
- Automatically fixes formatting issues

## Installation

Add this to your `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/will-rice/prettier-pre-commit
    rev: v1.0.2 # First version that works.
    hooks:
      - id: prettier-format
```

Then run:

```bash
pre-commit install
```

## Usage

The hook will automatically run on staged files matching:

- `*.json`
- `*.yaml`, `*.yml`
- `*.md`, `*.markdown`
- `*.toml`

To manually format files:

```bash
pre-commit run prettier-format -a
```

## Configuration

Create a `.prettierrc` file in your repository root to customize formatting options:

```json
{
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "plugins": ["prettier-plugin-toml"]
}
```

See [Prettier configuration docs](https://prettier.io/docs/en/configuration.html) for all options.

## Requirements

- pre-commit >= 3.0.0

## Contributing

Contributions are welcome! This hook currently supports JSON, YAML, Markdown, and TOML files - these are the file types I use in my projects. If you'd like to add support for additional file types that Prettier can handle, feel free to open a pull request or issue.

## License

MIT License - see [LICENSE](LICENSE) for details.
