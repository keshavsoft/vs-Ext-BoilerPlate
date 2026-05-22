import * as vscode from 'vscode';

export const openRoutesFile = async (fileToOpen) => {
    const document = await vscode.workspace.openTextDocument(
        vscode.Uri.file(fileToOpen)
    );

    await vscode.window.showTextDocument(document);
};