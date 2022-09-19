import * as vscode from "vscode";
import { displayName, version } from "../package.json";

import { nuxiApiMethods } from "./types";
import {
  defineCommand,
  defineCommandContext,
  useNuxiCommand,
  useNuxiAddCommandInput,
  useInputBox,
  useToggleSelect,
  logger,
} from "./utils";

import type { ExtensionContext } from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
const activate = (ext: ExtensionContext) => {
  logger.appendLine(`${displayName} for VS Code v${version}\n`);

  // Define Commands...
  defineCommandContext(ext, [
    defineCommand("addComponent", async ({ name }) => {
      // Create a Dialog of type InputBox
      const input = await useInputBox({
        title: "Add Component",
        prompt: "Enter the name of the component",
        placeHolder: `e.g. "Header"`,
      });

      if (!input) {
        return;
      }

      await useNuxiAddCommandInput({
        name,
        input,
      });
    }),
    defineCommand("addComposable", async ({ name }) => {
      // Create a Dialog of type InputBox
      const input = await useInputBox({
        title: "Add Composable",
        prompt: "Enter the name of the composable",
        placeHolder: `e.g. "useCounter"`,
      });

      if (!input) {
        return;
      }

      await useNuxiAddCommandInput({
        name,
        input,
      });
    }),
    defineCommand("addLayout", async ({ name }) => {
      // Create a Dialog of type InputBox
      const input = await useInputBox({
        title: "Add Layout",
        prompt: "Enter the name of the layout",
        placeHolder: `e.g. "default"`,
      });

      if (!input) {
        return;
      }

      await useNuxiAddCommandInput({
        name,
        input,
      });
    }),
    defineCommand("addPlugin", async ({ name }) => {
      // Create a Dialog of type InputBox
      const input = await useInputBox({
        title: "Add Plugin",
        prompt: "Enter the name of the plugin",
        placeHolder: `e.g. "foobar"`,
      });

      if (!input) {
        return;
      }

      await useNuxiAddCommandInput({
        name,
        input,
      });
    }),
    defineCommand("addMiddleware", async ({ name }) => {
      // Create a Dialog of type InputBox
      const input = await useInputBox({
        title: "Add Middleware",
        prompt: "Enter the name of the middleware",
        placeHolder: `e.g. "auth"`,
      });

      const isGlobal = await useToggleSelect(["default", "global"], {
        title: "Select whether the middleware should be global or default",
        placeHolder: "e.g. 'default'",
      });

      if (!input) {
        return;
      }

      await useNuxiAddCommandInput({
        name,
        input,
        execaArgs: [
          ...(isGlobal && isGlobal !== "default" ? ["--global"] : []),
        ],
      });
    }),
    defineCommand("addApi", async ({ name }) => {
      // Create a Dialog of type InputBox
      const input = await useInputBox({
        title: "Add API Endpoint",
        prompt: "Enter the name of the api endpoint",
        placeHolder: `e.g. "ping"`,
      });

      const method = await useToggleSelect(["default", ...nuxiApiMethods], {
        title: "Select the API HTTP method to use",
        placeHolder: "e.g. 'default'",
      });

      if (!input) {
        return;
      }

      await useNuxiAddCommandInput({
        name,
        input,
        execaArgs: [
          ...(method && method !== "default" ? ["--method", method] : []),
        ],
      });
    }),
    defineCommand("addPage", async ({ name }) => {
      // Create a Dialog of type InputBox
      const input = await useInputBox({
        prompt: "Enter the name of the page",
        placeHolder: `e.g. "category/[id]"`,
      });

      if (!input) {
        return;
      }

      await useNuxiAddCommandInput({
        name,
        input,
      });
    }),
    defineCommand("upgrade", async ({ name }) => {
      try {
        const { stdout } = await useNuxiCommand({
          name: "upgrade",
          execaArgs: ["--force"],
        });

        logger.appendLine(stdout);
        vscode.window.showInformationMessage(`Nuxt: Upgraded successfully!`);
      } catch (error) {
        vscode.window.showErrorMessage(
          `[Error] Nuxt: Couldn't upgrade to latest.`
        );
      }
    }),
  ]);
};

// this method is called when your extension is deactivated
const deactivate = () => {};

export { activate, deactivate };
