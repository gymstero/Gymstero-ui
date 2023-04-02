// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('metro-config');
const { resolve } = require('path');

require('dotenv').config({ path: resolve(__dirname, '.env') });

module.exports = (async () => {
    const {
        resolver: { sourceExts, assetExts },
    } = await getDefaultConfig();

    return {
        transformer: {
            assetPlugins: ['expo-asset/tools/hashAssetFiles'],
        },
        resolver: {
            assetExts: assetExts.filter((ext) => ext !== 'svg'),
            sourceExts: [...sourceExts, 'svg'],
        },
    };
})();
