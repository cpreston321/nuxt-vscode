import {
  vscode,
  defineCommand,
  useNuxiCommand,
  createMessageWithLog
} from "../utils";

import type { Progress } from "vscode";

export default defineCommand("typecheck", async () => {
  vscode.window.withProgress({
    location: vscode.ProgressLocation.Notification,
    cancellable: false,
    title: "Nuxt",
  }, async (p: Progress<{}>) => {
    try {
      p.report({ message: "checking types..." });
      const { stdout } = await useNuxiCommand({
        name: "typecheck"
      });

      return stdout;
    } catch (error: any) {
      await createMessageWithLog({
        message: `Couldn't run typecheck. See the log for more details.`, 
        type: "error",
        log: error.stderr
      });
    }
  }).then(async (stdout: any) => {
    if (stdout.includes("error TS") || stdout.includes("Errors  Files")) {
      await createMessageWithLog({
        message: `Typecheck failed. See the log for more details.`, 
        type: "error",
        log: stdout,
      });
    }
    
    return await createMessageWithLog({
      message: `Typecheck Success!`,
    });
  });
});