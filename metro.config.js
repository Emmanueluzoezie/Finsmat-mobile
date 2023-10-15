const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
    const {
        resolver: { sourceExts, assetExts },
    } = await getDefaultConfig(__dirname);

    const defaultSourceExts = [...sourceExts, "svg", "mjs", "cjs"];

    return {
        resolver: {
            extraNodeModules: {
                assert: require.resolve("empty-module"),
                http: require.resolve("empty-module"),
                https: require.resolve("empty-module"),
                os: require.resolve("empty-module"),
                url: require.resolve("empty-module"),
                zlib: require.resolve("empty-module"),
                path: require.resolve("empty-module"),
                crypto: require.resolve("crypto-browserify"),
                stream: require.resolve("readable-stream"),
            },

            assetExts: assetExts.filter((ext) => ext !== "svg"),

            sourceExts: process.env.TEST_REACT_NATIVE ? ["e2e.js"].concat(defaultSourceExts) : defaultSourceExts,
        },
        transformer: {
            getTransformOptions: async () => ({
                transform: {
                    experimentalImportSupport: false,
                    inlineRequires: true,
                },
            }),
        },
    };
})();

