import {
  defineCommand,
  useNuxiAddCommandInput,
  useInputBox,
  useToggleSelect,
} from "../utils";

export default defineCommand("addMiddleware", async ({ name }) => {
  // Create a Dialog of type InputBox
  const input = await useInputBox({
    title: "Add Middleware",
    prompt: "Enter the name of the middleware",
    placeHolder: `e.g. "auth"`,
  });

  // Create a additional Dialog for selecting the type of middleware.
  const isGlobal = await useToggleSelect(["default", "global"], {
    title: "Select whether the middleware should be global or default",
    placeHolder: "e.g. 'default'",
  });

  await useNuxiAddCommandInput({
    name,
    input,
    execaArgs: [
      ...(isGlobal && isGlobal !== "default" ? ["--global"] : []),
    ],
  });
});