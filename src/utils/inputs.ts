import * as vscode from "vscode";
import { logger } from ".";

import type { InputBoxOptions, QuickPickOptions } from "vscode";

export const useInputBox = async (options?: InputBoxOptions | undefined) => {
  const input = await vscode.window.showInputBox(options);

  if (!input) {
    logger.appendLine(`No input provided for "${options?.title}".`);
  }

  return input;
};

export const useToggleSelect = async (
  items: string[],
  options?: QuickPickOptions
) => {
  const input = await vscode.window.showQuickPick(items, options);
  return input;
};
