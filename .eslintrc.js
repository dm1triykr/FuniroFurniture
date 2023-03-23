module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "jquery": true
    },
    "extends": ["eslint:recommended"],
	"plugins": [
		"jquery"
	],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
		"indent": ["error", "tab"],
		"max-len": ["error", 80],
		"strict": ["error", "global"],
		"no-unused-vars": ["warn", { "vars": "local", "args": "after-used" }],
		"space-in-parens": [
			"error",
			"always",
			{
				"exceptions": ["{}"]
			}
		],
		"quotes": [2, "single"],
		"no-console": ["warn", {}]
    }
}
