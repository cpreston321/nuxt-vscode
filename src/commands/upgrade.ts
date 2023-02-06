import * as vscode from "vscode";
import {
  config,
  defineCommand,
  useNuxiCommand,
  useToggleSelect,
  createMessageWithLog
} from "../utils";

import type { Progress } from "vscode";

export default defineCommand("upgrade", async ({ name }) => {
  const runPrepare = config('upgrade.commands').get('runPrepare', true);
  const force = await useToggleSelect(["yes", "no"], {
    title: "Force Upgrade?",
    placeHolder: "e.g. 'no'",
  });

  vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    cancellable: false,
    title: "Nuxt",
  }, async (p: Progress<{}>) => {
    try {
      p.report({ message: "upgrading to latest version ..." });
      const { stdout } = await useNuxiCommand({
        name: "upgrade",
        execaArgs: force === "yes" ? ["--force"] : [],
      });

      return stdout;
    } catch (error: any) {
      await createMessageWithLog({
        message: `Couldn't upgrade Nuxt.`, 
        type: "error",
        log: error
      });
    }
  }).then(async (stdout: any) => {
    let logObj = {
      message: "upgrading nuxt failed.",
      type: "error"
    } as {
      message: string;
      type: "info" | "error";
    };
    
    if (stdout.includes("Successfully")) {
      logObj = {
        message: `upgraded to latest version of Nuxt 3!`,
        type: "info"
      };
    } else if (stdout.includes("already using")) {
      logObj = {
        message: `already using latest version!`,
        type: "info"
      };
    }

    // Run Nuxi Prepare if set globally in settings
    if (runPrepare && logObj.type === "info") {
      vscode.commands.executeCommand("nuxt.prepare");
    }

    await createMessageWithLog({
      message: logObj.message, 
      type: logObj.type,
      log: stdout
    });
  });
});
