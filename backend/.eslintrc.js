module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: [
    "@typescript-eslint"
  ],
  rules: {
    "semi": ["warn", "always"],
    "quotes": ["warn", "single"],
    "linebreak-style": "off"
  },
  ignorePatterns: ["src/**/*.test.ts", "/frontend/*"]
}