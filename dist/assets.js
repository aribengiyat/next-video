import { env } from "node:process";
import { readFile, writeFile } from "node:fs/promises";
async function getAsset(filePath) {
  const assetPath = getAssetConfigPath(filePath);
  const file = await readFile(assetPath);
  const asset = JSON.parse(file.toString());
  return asset;
}
async function createAsset(filePath, assetDetails) {
  const assetPath = getAssetConfigPath(filePath);
  const newAssetDetails = {
    ...assetDetails,
    status: "pending",
    originalFilePath: filePath,
    externalIds: {},
    createdAt: Date.now(),
    updatedAt: Date.now()
  };
  try {
    await writeFile(assetPath, JSON.stringify(newAssetDetails), { flag: "wx" });
  } catch (err) {
    if (err.code === "EEXIST") {
      return;
    }
    throw err;
  }
  return newAssetDetails;
}
async function updateAsset(filePath, assetDetails) {
  const assetPath = getAssetConfigPath(filePath);
  const currentAsset = await getAsset(filePath);
  const newAssetDetails = {
    ...currentAsset,
    ...assetDetails,
    externalIds: {
      ...currentAsset?.externalIds,
      ...assetDetails.externalIds
    },
    updatedAt: Date.now()
  };
  await writeFile(assetPath, JSON.stringify(newAssetDetails));
  return newAssetDetails;
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
  createAsset,
  getAsset,
  updateAsset
};
