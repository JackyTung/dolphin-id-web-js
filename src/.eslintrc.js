module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["simple-import-sort"],
  extends: ["react-app"],
  env: {
    browser: true,
    node: true,
  },
  rules: {
    "react/react-in-jsx-scope": 0,
    "react/prop-types": 0,
    "react/jsx-props-no-spreading": 0,
    semi: ["error", "never"],
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "class-methods-use-this": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "max-len": ["error", { code: 120 }],
    "global-require": 0,
    "no-console": 0,
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: [
          "state",
          "res",
          "ctx",
          "e",
          "accumulator",
        ],
      },
    ],
    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
          ],
          // Packages. `react and next` related packages come first.
          ["^(react|next)", "^@?\\w"],
          // Internal packages.
          ["^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)"],
          // Side effect imports.
          ["^\\u0000"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports.
          ["^.+\\.s?css$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    // note you must disable the base rule as it can report incorrect errors
    "no-use-before-define": "off",
  },
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", __dirname]],
        extensions: [".ts", ".js", ".jsx", ".tsx", ".json"],
      },
    },
  },
}
