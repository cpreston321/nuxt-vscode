import {
  defineCommand,
  useNuxiAddCommandInput,
  useInputBox,
} from "../utils";

export default defineCommand("addComposable", async ({ name }) => {
  // Create a Dialog of type InputBox
  const input = await useInputBox({
    title: "Add Composable",
    prompt: "Enter the name of the composable",
    placeHolder: `e.g. "useCounter"`,
  });

  await useNuxiAddCommandInput({
    name,
    input,
  });
})