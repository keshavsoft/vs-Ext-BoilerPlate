import * as vscode from 'vscode';
import path from 'path';

export const openFileInEditor = async ({ inFolderPath }) => {
    const fileToOpen = path.join(
        inFolderPath,
        'rest.http'
    );

    const document = await vscode.workspace.openTextDocument(
        vscode.Uri.file(fileToOpen)
    );

    await vscode.window.showTextDocument(document);
};