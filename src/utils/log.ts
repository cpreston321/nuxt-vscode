import { window } from "vscode";
import { displayName } from "../../package.json";

export const log = window.createOutputChannel(displayName);
