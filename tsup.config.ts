import { defineConfig } from "tsup";

export default defineConfig({
  shims: false,
  format: ["cjs"],
  entry: ["src/index.ts"],
  external: ["vscode"],
});
