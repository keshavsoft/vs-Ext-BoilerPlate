// src/V9/InitJs/services/openFile.js;

import * as vscode from 'vscode';
import path from 'path';

export const openEndpointsFile = async (folderPath) => {
    const fileToOpen = path.join(
        folderPath,
        'endpoints.js'
    );

    const document = await vscode.workspace.openTextDocument(
        vscode.Uri.file(fileToOpen)
    );

    await vscode.window.showTextDocument(document);
};