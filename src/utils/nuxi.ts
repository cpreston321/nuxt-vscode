import { execa } from "execa";
import * as vscode from "vscode";

import { rootDir, isNuxiLocal, createMessageWithLog } from ".";

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
    if (!input) {
      return;
    }

    const { stdout } = await useNuxiCommand({
      name: "add",
      execaArgs: [name, `${input}`, ...execaArgs],
    });

    if (stdout.includes("Generated")) {
      const filePath = stdout.split("\n")?.[1]?.match(/\/.*/g)?.[0];
      const fileUri = vscode.Uri.file(filePath as string);

      setTimeout(async () => {
        if (fileUri) {
          openFileInCode(fileUri);
        }
      }, 1000);

      await createMessageWithLog({
        message: `Added ${name} "${input}" successfully!`,
        log: stdout,
      });
    }
  } catch (error: any) {
    let message = `Couldn't add ${name}: "${input}".`;
    
    if (error?.stderr?.includes("File exists")) {
      message = `Couldn't add ${name}: "${input}". Already exists!`;
    }

    await createMessageWithLog({
      message,
      type: "error",
      log: error.stderr,
    });
  }
};

/**
 * `useNuxiCommand` - A Helper function to use Nuxi Add Command in CLI.
 *
 * @param { name, execaArgs }
 */
export const useNuxiCommand = async ({ name, execaArgs = [] }: NuxiCommand) => {
  let nuxiCommand = "npx nuxi";

  if (isNuxiLocal()) {
    nuxiCommand = "nuxi";
  }

  return await execa(nuxiCommand, [name, ...execaArgs], {
    cwd: rootDir,
    preferLocal: true,
    stdio: "pipe",
  });
};
