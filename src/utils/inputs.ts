import * as vscode from "vscode";
import { logger } from ".";

import type { InputBoxOptions, QuickPickOptions } from "vscode";

export const useInputBox = async (options?: InputBoxOptions | undefined) => {
  const input = await vscode.window.showInputBox(options);

  if (!input) {
    logger.appendLine(`No input provided for "${options?.title}".`);
  }

  return sanitizeInput(input || "");
};

export const useToggleSelect = async (
  items: string[],
  options?: QuickPickOptions
) => {
  const input = await vscode.window.showQuickPick(items, options);
  return input;
};

function sanitizeInput(input: string) {
  const regex = /\.[0-9a-z]+/g;
  if (regex.test(input)) {
    logger.appendLine(`["SanitizeInput"]: Input "${input}" has an extension. Sanitizing now -> "${input.replace(regex, "")}"\n`);
  }
  return input.replace(regex, "");
}
