# prettier-pre-commit

A minimal [pre-commit](https://pre-commit.com/) hook that uses [Prettier](https://prettier.io/) to format files in your projects.

## Features

- Formats JavaScript, TypeScript, CSS, HTML, JSON, YAML, Markdown, GraphQL, Vue, and more
- Supports all file formats that Prettier natively handles
- No system Node.js installation required (uses isolated nodeenv)
- Includes TOML support via `prettier-plugin-toml`
- Automatically fixes formatting issues

## Installation

Add this to your `.pre-commit-config.yaml`:

```yaml
repos:
  - repo: https://github.com/will-rice/prettier-pre-commit
    rev: v1.0.3 # First version that works.
    hooks:
      - id: prettier-format
```

Then run:

```bash
pre-commit install
```

## Usage

The hook will automatically run on staged files with extensions that Prettier supports, including:

- **JavaScript/TypeScript**: `*.js`, `*.jsx`, `*.ts`, `*.tsx`, `*.mjs`, `*.cjs`, and more
- **Web**: `*.html`, `*.htm`, `*.vue`, `*.handlebars`, `*.hbs`
- **Styles**: `*.css`, `*.scss`, `*.less`, `*.pcss`
- **Data formats**: `*.json`, `*.json5`, `*.yaml`, `*.yml`, `*.toml`
- **Markup**: `*.md`, `*.markdown`, `*.mdx`
- **GraphQL**: `*.graphql`, `*.gql`
- And more!

To manually format files:

```bash
pre-commit run prettier-format -a
```

## Configuration

Create a `.prettierrc` file in your repository root to customize formatting options:

```json
{
  "plugins": ["prettier-plugin-toml"]
}
```

See [Prettier configuration docs](https://prettier.io/docs/en/configuration.html) for all options.

## Requirements

- pre-commit >= 3.0.0

## Contributing

Contributions are welcome! This hook now supports all major file types that Prettier can handle. If you'd like to add support for additional Prettier plugins or improve the hook, feel free to open a pull request or issue.

## License

MIT License - see [LICENSE](LICENSE) for details.
