module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:metro-react-native-babel-preset"],
    plugins: [
      "react-native-reanimated/plugin", "react-native-paper/babel",
      ["module:react-native-dotenv", {
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "blacklist": null, // DEPRECATED
        "whitelist": null, // DEPRECATED
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }],
      [
        "module-resolver",
        {
          alias: {
            // app config
            "@/assets": "./src/assets",
            "@/constants": "./src/constants",
            "@/theme": "./src/theme",
            "@/wrapper": "./src/AppWrapper",
            // building blocks
            "@/components": "./src/components",
            "@/contexts": "./src/contexts",
            "@/copy": "./src/copy",
            "@/hocs": "./src/hocs",
            "@/hooks": "./src/hooks",
            "@/redux": "./src/redux",
            "@/router": "./src/router",
            "@/screens": "./src/screens",
            "@/utils": "./src/utils",
            "@/api": "./src/api"
          },
        },
      ],
    ],
  };
};
