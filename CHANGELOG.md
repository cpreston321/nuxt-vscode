# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.4](https://github.com/cpreston321/nuxt-vscode/compare/v0.0.3...v0.0.4) (2022-10-03)

## 0.0.4 (2022-10-03)

### ✨ Features

- Project Settings for `Nuxt VSCode`
  - Added `disable` - Disable the extension per workspace (optional)
    - Default: `false`
  - Added `root` - Root directory of the project within the workspace.
    - Defaults to `workspaceFolder`

### ⚡️ Improvements

- Sanitize `input` values to strip out extentions (e.g. `Header.vue` -> `Header`).
  - Cleans up so you accidentally type wrong it will still create the file correctly.

## 0.0.2 || 0.0.3 (2022-09-22)

### ⚡️ Improvements

- Prefer local `nuxi` over global if available.
- Double check workspace to see if it's a Nuxt project.
- Better error handling by sending output to `Nuxt (unofficial)` channel within VSCode.
- Group commands under `✨ Nuxt` and `⚙️ Nuxt Utilities` in command palette.

## 0.0.1

- Initial Pre-Release Preview
