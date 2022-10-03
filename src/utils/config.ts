import { vscode } from ".";
import { name } from "../../package.json";

export const config = vscode.workspace.getConfiguration(name);

export default config;
