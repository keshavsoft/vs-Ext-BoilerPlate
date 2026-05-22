// src/utils/response.js

import * as vscode from 'vscode';

export function finalize({ folderPath }) {
    vscode.window.showInformationMessage(`Created: ${folderPath}`);
}

export function fail(error) {
    vscode.window.showErrorMessage(error.message);
}