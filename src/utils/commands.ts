import * as vscode from "vscode";
import { commandName } from "../../package.json";

import { hasNuxtConfig } from "./pkg";

import type { Disposable, ExtensionContext } from "vscode";

const commands = [
  "addComponent",
  "addComposable",
  "addLayout",
  "addPlugin",
  "addPage",
  "addLayout",
  "addMiddleware",
  "addApi",
  "addPage",
  "typecheck",
  "upgrade",
] as const;

type CommandsList = typeof commands[number];

/**
 * `defineCommandContext` - Define Commands Context
 *
 * @param ext - Extension Context
 * @param commands - Array of Commands[] to register.
 */
export const defineCommandContext = (
  ext: ExtensionContext,
  commands: Disposable[]
) => {
  // Set Context for so it doesn't show up for `editor/context` menu
  // if not a Nuxt project
  vscode.commands.executeCommand('setContext', 'ext.hasNuxtConfig', hasNuxtConfig());

  ext.subscriptions.push(...commands);
};

/**
 * `defineCommand` - is a helper function to define a command for the extension.
 *
 * @example
 * ```ts
 * import { defineCommandContext, defineCommand } from "./utils";
 *
 * defineCommandContext(ext, [
 *  defineCommand("addPage", () => { // code here }),
 *  defineCommand("addLayout", () => { // code here }),
 * ]);
 * ```
 *
 * @param command - The command to register
 * @param cb - The callback to execute when the command is run
 *
 * @returns A `Disposable` that can be used to unregister the command
 */
export const defineCommand = (
  command: CommandsList,
  cb: (...args: any[]) => any
): Disposable => {
  return vscode.commands.registerCommand(
    `${commandName}.${command}`,
    async () =>{
      // Make sure they have a Nuxt Project
      if (!hasNuxtConfig()) {
        return vscode.window.showErrorMessage(
          "[Error] Nuxt: Couldn't find 'nuxt.config' within the workspace.\nAre you sure this is a Nuxt project?"
        );
      }

      await cb({
        name: command.replace("add", "").toLowerCase(),
        command: command,
      })
  });
};
