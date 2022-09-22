import { window } from "vscode";
import { defu } from "defu";
import { displayName } from "../../package.json";

import type { ShowMessageWithLog } from "../types";

export const log = window.createOutputChannel(displayName);

/**
 * `createMessage` is a helper function to create a message
 * 
 * @param message - Message to show
 * @param type - info | error | warning
 * @param type - info | error | warning
 */
export const createMessageWithLog = async (options: ShowMessageWithLog): Promise<void> => {
  let choice;
  const items = ['Open Logs'];
  const { message, type, log: logMessage } = defu(options, {
    type: "info",
    log: "",
  });

  if (logMessage) {
    log.appendLine(logMessage);
  }

  if (type === 'error') {
    choice = await window.showErrorMessage(`[Error][Nuxt]: ${message}`, ...items);
  } else if (type === 'warning') {
    choice = await window.showWarningMessage(`[Warning][Nuxt]: ${message}`, ...items);
  } else {
    choice = await window.showInformationMessage(`[Info][Nuxt]: ${message}`, ...items);
  }

  switch (choice) {
    case 'Open Logs':
      log.show();
      break;
  }
};
