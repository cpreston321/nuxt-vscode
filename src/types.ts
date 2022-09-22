export type NuxiAddNames =
  | "component"
  | "composable"
  | "layout"
  | "plugin"
  | "page"
  | "middleware"
  | "api";

export const nuxiApiMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "patch",
  "post",
  "put",
  "trace",
] as const;

export type NuxiApiMethods = typeof nuxiApiMethods[number];

export interface NuxiAddCommand {
  name: NuxiAddNames;
  input: string | undefined;
  execaArgs?: string[];
}

export interface NuxiCommand {
  name: string;
  execaArgs?: string[];
}

export type ShowMessageTypes = "info" | "error" | "warning";
export interface ShowMessageWithLog {
  message: string;
  type?: ShowMessageTypes;
  log?: string;
}