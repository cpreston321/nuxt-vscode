import { displayName, version } from "../package.json";

import commands from "./commands";
import {
  config,
  logger,
  rootDir,
  getNuxtVersion,
  defineCommandContext
} from "./utils";

import type { ExtensionContext } from "vscode";

const activate = (ext: ExtensionContext) => {
  logger.appendLine(`${displayName} for VS Code v${version}\n`);
  
  const disabled = config().get('disabled', false);
  if (disabled) {
    logger.appendLine('Nuxt Extention is disabled by configuration property. Please enable it to use it.');
    return;
  }

  if (getNuxtVersion()) {
    logger.appendLine(`------- NUXT -----------`);
    logger.appendLine(`Nuxt Root Directory: "${rootDir}"`);
    logger.appendLine(`Nuxt Version Installed: "${getNuxtVersion()}"`);
    logger.appendLine(`-------------------------\n`);
  }

  // Define Commands...
  defineCommandContext(ext, [...commands]);
};

const deactivate = () => {};

export { activate, deactivate };
