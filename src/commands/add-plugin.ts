import {
  defineCommand,
  useNuxiAddCommandInput,
  useInputBox,
} from "../utils";

export default defineCommand("addPlugin", async ({ name }) => {
  // Create a Dialog of type InputBox
  const input = await useInputBox({
    title: "Add Plugin",
    prompt: "Enter the name of the plugin",
    placeHolder: `e.g. "foobar"`,
  });

  await useNuxiAddCommandInput({
    name,
    input,
  });
});