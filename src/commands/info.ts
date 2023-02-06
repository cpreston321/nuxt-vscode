import { window } from "vscode";

import {
  defineCommand,
  useNuxiCommand
} from "../utils";

export default defineCommand("info", async () => {
  await useNuxiCommand({
    name: "info"
  });

  window.showInformationMessage("Nuxt info copied to clipboard!");
});
