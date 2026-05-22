// src/V9/InitJs/services/openFile.js;

import * as vscode from 'vscode';
import path from 'path';

export const openRoutesFile = async (folderPath) => {
    const fileToOpen = path.join(
        folderPath,
        'routes.js'
    );

    const document = await vscode.workspace.openTextDocument(
        vscode.Uri.file(fileToOpen)
    );

    await vscode.window.showTextDocument(document);
};