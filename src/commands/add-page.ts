import {
  defineCommand,
  useNuxiAddCommandInput,
  useInputBox,
} from "../utils";

export default defineCommand("addPage", async ({ name }) => {
  // Create a Dialog of type InputBox
  const input = await useInputBox({
    prompt: "Enter the name of the page",
    placeHolder: `e.g. "category/[id]"`,
  });

  await useNuxiAddCommandInput({
    name,
    input,
  });
})