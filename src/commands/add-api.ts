import { nuxiApiMethods } from "../types";
import {
  defineCommand,
  useNuxiAddCommandInput,
  useInputBox,
  useToggleSelect,
} from "../utils";

export default defineCommand("addApi", async ({ name }) => {
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

  await useNuxiAddCommandInput({
    name,
    input,
    execaArgs: [
      ...(method && method !== "default" ? ["--method", method] : []),
    ],
  });
})