module.exports = {
  root: true,
  env: {
    browser: true,
    es2024: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
    project: true,
    tsconfigRootDir: __dirname,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  rules: {
    "import/no-internal-modules": [
      "error",
      {
        forbid: [
          "@/server/*",
          "@/server/**/*",
          "**/.*/server/**/*",
          "../../.*/server/**/*",
          "../../../.*/server/**/*",
        ],
      },
    ],
    "no-duplicate-imports": ["error", { includeExports: true }],
    "no-template-curly-in-string": "error",
    "no-else-return": "error",
    "no-throw-literal": "error",
    "object-shorthand": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          arguments: false,
          attributes: false,
        },
      },
    ],
    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "sibling",
          "parent",
          "index",
        ],
        "newlines-between": "never",
      },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      extends: ["plugin:@typescript-eslint/disable-type-checked"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-require-imports": "off",
      },
    },
    {
      files: ["next-env.d.ts"],
      rules: { "@typescript-eslint/triple-slash-reference": "off" },
    },
  ],
};
