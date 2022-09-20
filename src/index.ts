import * as vscode from "vscode";
import { displayName, version } from "../package.json";

import commands from "./commands";
import {
  defineCommandContext,
  logger,
} from "./utils";

import type { ExtensionContext } from "vscode";

const activate = (ext: ExtensionContext) => {
  logger.appendLine(`${displayName} for VS Code v${version}\n`);

  // Define Commands...
  defineCommandContext(ext, [...commands]);
};

const deactivate = () => {};

export { activate, deactivate };
