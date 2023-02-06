import * as vscode from "vscode";
import {
  defineCommand,
  useNuxiCommand,
  createMessageWithLog
} from "../utils";

import type { Progress } from "vscode";

export default defineCommand("prepare", async () => {
  vscode.window.withProgress({
    title: "Nuxt",
    cancellable: false,
    location: vscode.ProgressLocation.Notification,
  }, async (p: Progress<{}>) => {
    try {
      p.report({ message: "preparing types in the .nuxt folder..." });
      const { stdout } = await useNuxiCommand({
        name: "prepare",
      });

      return stdout;
    } catch (error: any) {
      await createMessageWithLog({
        message: `Couldn't prepare nuxt. Please check debug console for more information.`, 
        type: "error",
        log: error
      });
    }
  }).then(async (stdout: any) => {
    let log = {
      message: stdout.includes("Types generated") ? `Generated .nuxt types successfully.` : `Couldn't generate nuxt types.`,
      type: stdout.includes("Types generated") ? "info" : "error",
    } as {
      message: string;
      type: "info" | "error";
    };

    return await createMessageWithLog({
      message: log.message,
      type: log.type,
      log: stdout
    });
  });
});
