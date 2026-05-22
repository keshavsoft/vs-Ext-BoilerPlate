// src/V9/createFullEndpoint/orchestration/startOrchestration.js

import * as vscode from 'vscode';
import { validateEntryFilePath } from "../services/ValidateEntryFile/start.js";

export async function startOrchestration({ uri, context }) {

    const log = (m) => console.log(`[CreateFullEndpoint][${new Date().toISOString()}] ${m}`);
    try {
        const filePath = uri.fsPath;
        // const content = editor.document.getText();

        validateEntryFilePath({ entryFilePath: filePath, context, uri });
    } catch (e) {
        log(`ERROR: ${e.message};`);
        vscode.window.showErrorMessage(`Error: ${e.message}`);
    }
};