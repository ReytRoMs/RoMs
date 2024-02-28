/** @type {import("eslint").Linter.Config} */
module.exports = {
	root: true,
	extends: ["@repo/eslint-config/react-internal.js", "eslint:recommended", "plugin:@typescript-eslint/recommended"],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	rules: {
		"@typescript-eslint/ban-ts-comment": "off",
		"no-unused-vars": "off",
		"@typescript-eslint/no-unused-vars": ["error"],
		"no-console": ["error", { allow: ["warn", "error"] }]
	}
};
