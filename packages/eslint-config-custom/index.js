module.exports = {
  extends: ["next", "turbo", "prettier"],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "no-console": 2,
    "turbo/no-undeclared-env-vars": "off",
  },
};
