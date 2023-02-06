import { vscode } from ".";
import { name } from "../../package.json";

export function config(section?: string) {
  if (!section) {return vscode.workspace.getConfiguration(name);}
  
  return vscode.workspace.getConfiguration(`${name}.${section}`);
}

export default config;
