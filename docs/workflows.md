# CI/CD Workflows

This project uses several GitHub Actions workflows to automate code quality, delivery, and maintenance. Here is a summary of each workflow:

## 1. `ci.yml`

This workflow runs on every push or pull request to the main branch. It includes:

- **Lint**: Checks code quality with ESLint and Prettier.
- **Type-check**: Runs TypeScript type checking.
- **Tests**: Runs unit tests with vites and generates a coverage report.
- **Knip**: Check for unused exports and files
- **Build**: Compiles the project (`yarn build`).
- **Semantic Release**: Manages project versioning and automated publishing according to commit conventions.

## 2. `release.yml`

This workflow runs when a version tag is created. It:

- Creates a zip archive of the build.
- Attaches this archive to the corresponding tag on GitHub.

## 3. `dependabot.yml`

Dependabot automates dependency updates. It creates pull requests to keep dependencies up to date and secure.

---

For more details, see the files in `.github/workflows/` and `.github/dependabot.yml`.
