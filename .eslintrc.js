module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ["airbnb-base"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
<<<<<<< Updated upstream
    'linebreak-style': ['error', process.env.NODE_ENV === 'prod' ? 'unix' : 'windows'],

=======
    "linebreak-style": [
      "error",
      process.env.NODE_ENV === "prod" ? "unix" : "windows",
    ],
    quotes: ["error", "double"],
    semi: ["error", "never"],
>>>>>>> Stashed changes
  },
}
