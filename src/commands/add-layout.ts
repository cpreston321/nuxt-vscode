import {
  defineCommand,
  useNuxiAddCommandInput,
  useInputBox,
} from "../utils";

export default defineCommand("addLayout", async ({ name }) => {
  // Create a Dialog of type InputBox
  const input = await useInputBox({
    title: "Add Layout",
    prompt: "Enter the name of the layout",
    placeHolder: `e.g. "default"`,
  });

  await useNuxiAddCommandInput({
    name,
    input,
  });
})