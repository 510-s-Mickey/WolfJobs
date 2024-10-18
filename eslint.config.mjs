import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.chai,
        ...globals.mocha,
      },
      sourceType: "commonjs", // or "commonjs" as needed
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  // Add any additional plugins or settings here
];
