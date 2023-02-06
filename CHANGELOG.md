# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.6](https://github.com/cpreston321/nuxt-vscode/compare/v0.0.5...v0.0.6) (2023-02-05)

### ✨ Features

- **feat(commands)** - 🆕 `Nuxt: Prepare Types` - same as running `nuxi prepare` in the terminal.
- **feat(commands)** - 🆕 `Nuxt: Info` - same as running `nuxi info` in the terminal and will copy info automatically to clipboard.
- **feat(settings)** - 🆕 `Nuxt Commands Upgrade Run Prepare` - Run prepare after upgrade. This can be disabled if you don't want to run `nuxi prepare` on upgrade.
  - Default: `true`

### ⚡️ Improvements

- **chore**: update dependencies
- **chore**: lint fixes

### [0.0.5](https://github.com/cpreston321/nuxt-vscode/compare/v0.0.4...v0.0.5) (2022-10-06)


### 🐛 Bug Fixes

- Context Menu
  - `fixed` - Layout context menu not showing up
  - `fixed` - `Nuxt: Add Middleware` had incorrect name in context menu

### [0.0.4](https://github.com/cpreston321/nuxt-vscode/compare/v0.0.3...v0.0.4) (2022-10-03)

### ✨ Features

- Project Settings for `Nuxt VSCode`
  - Added `disable` - Disable the extension per workspace (optional)
    - Default: `false`
  - Added `root` - Root directory of the project within the workspace.
    - Defaults to `workspaceFolder`

### ⚡️ Improvements

- Sanitize `input` values to strip out extentions (e.g. `Header.vue` -> `Header`).
  - Cleans up so you accidentally type wrong it will still create the file correctly.

## [0.0.2 || 0.0.3](https://github.com/cpreston321/nuxt-vscode/compare/v0.0.1...v0.0.3) (2022-09-22)

### ⚡️ Improvements

- Prefer local `nuxi` over global if available.
- Double check workspace to see if it's a Nuxt project.
- Better error handling by sending output to `Nuxt (unofficial)` channel within VSCode.
- Group commands under `✨ Nuxt` and `⚙️ Nuxt Utilities` in command palette.

## 0.0.1

- Initial Pre-Release Preview
