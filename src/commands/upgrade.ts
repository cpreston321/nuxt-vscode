import * as vscode from "vscode";
import {
  defineCommand,
  useNuxiCommand,
} from "../utils";

export default defineCommand("upgrade", async ({ name }) => {
  try {
    const { stdout } = await useNuxiCommand({
      name: "upgrade",
      execaArgs: ["--force"],
    });

    // TODO: Add Progress Bar
    vscode.window.showInformationMessage(`Nuxt: Upgraded successfully!`);
  } catch (error) {
    vscode.window.showErrorMessage(
      `[Error] Nuxt: Couldn't upgrade to latest.`
    );
  }
});