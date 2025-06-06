/* eslint-env node */
/** @type { import("eslint").Linter.Config } */
module.exports = {
  env: {
    browser: true,
    es6: true,
    webextensions: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:wc/recommended",
    "plugin:lit/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "lit"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.eslint.json"],
    tsconfigRootDir: __dirname,
  },
  root: true,
  rules: {
    /* start stylistic rules */
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/array-type": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/prefer-readonly": "warn",
    "@typescript-eslint/class-literal-property-style": ["warn", "getters"],
    "@typescript-eslint/consistent-generic-constructors": "error",
    "@typescript-eslint/consistent-type-assertions": "error",
    "@typescript-eslint/no-confusing-non-null-assertion": "warn",
    "@typescript-eslint/no-inferrable-types": "warn",
    "@typescript-eslint/non-nullable-type-assertion-style": "warn",
    "@typescript-eslint/prefer-for-of": "warn",
    // "@typescript-eslint/prefer-nullish-coalescing": "warn",
    "@typescript-eslint/prefer-optional-chain": "warn",
    "@typescript-eslint/prefer-string-starts-ends-with": "warn",
    /* end stylistic rules */

    /* start recommended rules */
    "no-restricted-globals": [2, "event", "error"],
    "@typescript-eslint/no-base-to-string": "warn",
    "@typescript-eslint/no-duplicate-enum-values": "error",
    "@typescript-eslint/no-duplicate-type-constituents": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-extra-non-null-assertion": "error",
    // "@typescript-eslint/no-floating-promises": "warn",
    "@typescript-eslint/no-for-in-array": "warn",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        destructuredArrayIgnorePattern: "^_",
      },
    ],
    "no-implied-eval": "off",
    "@typescript-eslint/no-implied-eval": "error",
    "no-loss-of-precision": "off",
    "@typescript-eslint/no-loss-of-precision": "warn",
    "@typescript-eslint/no-misused-new": "error",
    "@typescript-eslint/no-misused-promises": [
      "error",
      { checksVoidReturn: { arguments: false } },
    ],
    "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "error",
    "@typescript-eslint/no-non-null-asserted-optional-chain": "warn",
    "@typescript-eslint/no-redundant-type-constituents": "warn",
    "@typescript-eslint/no-this-alias": "warn",
    "@typescript-eslint/no-unnecessary-type-assertion": "warn",
    "@typescript-eslint/no-unnecessary-type-constraint": "warn",
    // "@typescript-eslint/no-unsafe-argument": "warn",
    // "@typescript-eslint/no-unsafe-assignment": "warn",
    // "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-declaration-merging": "warn",
    "@typescript-eslint/no-unsafe-enum-comparison": "warn",
    // "@typescript-eslint/no-unsafe-member-access": "warn",
    // "@typescript-eslint/no-unsafe-return": "warn",
    "@typescript-eslint/prefer-as-const": "warn",
    "require-await": "off",
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/restrict-template-expressions": "warn",
    "@typescript-eslint/unbound-method": "off",
  },
  ignorePatterns: [
    "ruffle/**/*",
    "build/**/*",
    "/sw.js",
    "/ui.js",
    "dist/**/*",
  ],
  reportUnusedDisableDirectives: true,
};
