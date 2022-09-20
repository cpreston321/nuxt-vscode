import {
  defineCommand,
  useNuxiAddCommandInput,
  useInputBox,
} from "../utils";

/**
 * Add a component to the project
 */
export default defineCommand("addComponent", async ({ name }) => {
  // Create a Dialog of type InputBox
  const input = await useInputBox({
    title: "Add Component",
    prompt: "Enter the name of the component",
    placeHolder: `e.g. "Header"`,
  });

  await useNuxiAddCommandInput({
    name,
    input,
  });
})