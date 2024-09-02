import Asset from '../models/asset.js';

export default async function getAssetById(asset_id) {
  return Asset.findByPk(asset_id);
}
