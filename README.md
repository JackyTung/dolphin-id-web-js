Add following config under your .vscode/settings.json

```
{
    "editor.fontSize": 14,
    "editor.tabSize": 2,
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
    },
    "editor.formatOnPaste": false,
    "javascript.format.enable": true,
    "javascript.updateImportsOnFileMove.enabled": "always",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "eslint.validate": [
      "javascript",
      "javascriptreact",
      "typescript",
      "typescriptreact"
    ],
    "prettier.semi": false,
    "[json]": {
        "editor.quickSuggestions": {
            "strings": true
        },
        "editor.suggest.insertMode": "replace",
        "gitlens.codeLens.scopes": [
            "document"
        ]
    }
}
```
