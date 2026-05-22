// src/utils/response.js

import * as vscode from 'vscode';

export function finalize({ message }) {
    vscode.window.showInformationMessage(message);
};

export function fail(error) {
    vscode.window.showErrorMessage(error.message);
};