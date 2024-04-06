import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { env } from "node:process";
const raw = true;
async function loader(source) {
  const assetPath = path.resolve(getAssetConfigPath(this.resourcePath));
  this.addDependency(assetPath);
  let asset;
  try {
    asset = await readFile(assetPath, "utf-8");
  } catch {
    const originalFilePath = isRemote(this.resourcePath) ? this.resourcePath : path.relative(process.cwd(), this.resourcePath);
    asset = JSON.stringify({
      status: "sourced",
      originalFilePath
    });
    await writeFile(assetPath, asset, { flag: "wx" });
  }
  return `export default ${asset}`;
}
function getAssetConfigPath(filePath) {
  if (isRemote(filePath)) {
    const VIDEOS_DIR = JSON.parse(env["__NEXT_VIDEO_OPTS"] ?? "{}").folder;
    if (!VIDEOS_DIR)
      throw new Error("Missing video `folder` config.");
    return `${VIDEOS_DIR}/${toSafePath(filePath)}.json`;
  }
  return `${filePath}.json`;
}
function isRemote(filePath) {
  return /^https?:\/\//.test(filePath);
}
function toSafePath(str) {
  return str.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, "").replace(/[^a-zA-Z0-9._-]+/g, "_");
}
export {
  loader as default,
  raw
};
