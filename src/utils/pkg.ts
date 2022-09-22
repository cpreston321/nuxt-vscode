import * as vscode from 'vscode';
import { existsSync, readFileSync } from 'node:fs'
import { createRequire } from 'node:module'

import destr from 'destr'
import jiti from 'jiti'
import { resolve, normalize } from 'pathe'
import { logger } from '.';

export const rootDir = vscode.workspace.workspaceFolders?.[0].uri.path;
const _require = createRequire(rootDir as string)

function getModulePaths (paths?: string | string[]): string[] {
  return ([] as Array<string | undefined>)
    .concat(
      // @ts-expect-error global object
      global.__NUXT_PREPATHS__,
      // @ts-expect-error global object
      global.__NUXT_PATHS__,
      // main paths
      paths
    )
    .filter(Boolean) as string[]
}

function resolveModule (id: string, paths?: string | string[]) {
  return normalize(_require.resolve(id, { paths: getModulePaths(paths) }))
}

function tryResolveWorkspaceModule (id: string) {
  try {
    return resolveModule(id, rootDir)
  } catch { return null }
}

function readJSONSync (filePath: string) {
  try {
    return destr(readFileSync(filePath, 'utf-8'))
  } catch (err) {
    // TODO: Warn error
    return null
  }
}

// TODO make a deep search for all workspace dirs and find the nuxt project.
export const isNuxiLocal = () => Boolean(tryResolveWorkspaceModule('nuxi'));
export const getNuxtVersion = () => {
  const pkg = readJSONSync(resolve(rootDir as string, 'package.json'))
  return pkg?.dependencies?.nuxt || pkg?.devDependencies?.nuxt
}
export const hasNuxtConfig = () => existsSync(resolve(rootDir as string, 'nuxt.config.ts')) || existsSync(resolve(rootDir as string, 'nuxt.config.js'))
export function getNuxtConfig () {
  try {
    (globalThis as any).defineNuxtConfig = (c: any) => c
    const config = jiti(resolve(rootDir as string), { interopDefault: true, esmResolve: true })('./nuxt.config')
    delete (globalThis as any).defineNuxtConfig
    return config
  } catch (err: any) {
    logger.appendLine(err)
    return {}
  }
}