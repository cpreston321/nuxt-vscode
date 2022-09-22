import * as vscode from "vscode";
import {
  defineCommand,
  useNuxiCommand,
  useToggleSelect,
  createMessageWithLog
} from "../utils";

import type { Progress } from "vscode";

export default defineCommand("upgrade", async ({ name }) => {
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
    if (stdout.includes("Successfully")) {
      return await createMessageWithLog({
        message: `upgraded successfully.`, 
        log: stdout
      });
    } else if (stdout.includes("already using")) {
      return await createMessageWithLog({
        message: `Already using latest version!`, 
        log: stdout
      });
    }

    await createMessageWithLog({
      message: `Couldn't upgrade Nuxt.`, 
      type: "error",
      log: stdout
    });
  })
});