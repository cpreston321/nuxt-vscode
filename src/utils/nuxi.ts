import { execa } from "execa";
import * as vscode from "vscode";

import type { NuxiCommand, NuxiAddCommand } from "../types";

const openFileInCode = async (path: any) => {
  let doc = await vscode.workspace.openTextDocument(path);
  await vscode.window.showTextDocument(doc);
};

/**
 * `useNuxiAddCommandInput` - A Helper function to use Nuxi Add Command in CLI.
 *
 * @param name - The name of the command to run
 * @param input - The input to pass to the command
 * @param execaArgs - The arguments to pass to the command
 */
export const useNuxiAddCommandInput = async ({
  name,
  input,
  execaArgs = [],
}: NuxiAddCommand) => {
  try {
    const { stdout } = await useNuxiCommand({
      name: "add",
      execaArgs: [name, `${input}`, ...execaArgs],
    });

    if (stdout.includes("Generated")) {
      // use stdout and parse the file path and open it withing vscode.
      const filePath = stdout.split("\n")?.[1]?.match(/\/.*/g)?.[0];
      const fileUri = vscode.Uri.file(filePath);

      setTimeout(async () => {
        if (fileUri) {
          openFileInCode(fileUri);
        }
      }, 1000);

      vscode.window.showInformationMessage(
        `Nuxt: added ${name} "${input}" successfully!`
      );
    }
  } catch (error: any) {
    if (error?.stderr?.includes("File exists")) {
      return vscode.window.showErrorMessage(
        `[Error] Nuxt: File already exists! Couldn't add ${name}: "${input}"`
      );
    }

    vscode.window.showErrorMessage(
      `[Error] Nuxt: Couldn't add ${name}: "${input}".`
    );
  }
};

/**
 * `useNuxiCommand` - A Helper function to use Nuxi Add Command in CLI.
 *
 * @param name - The name of the main command to run
 * @param execaArgs - The arguments to pass to the command
 */
export const useNuxiCommand = async ({ name, execaArgs = [] }: NuxiCommand) => {
  // Current Working Directory
  const rootDir = vscode.workspace.workspaceFolders?.[0].uri.path;
  const execaOuput = await execa("npx", ["nuxi", name, ...execaArgs], {
    cwd: rootDir,
    preferLocal: true,
    stdio: "pipe",
  });

  return execaOuput;
};
