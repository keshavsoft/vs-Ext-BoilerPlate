import * as vscode from 'vscode';

export async function insertAfterImports(uri, text) {
    const editor = await vscode.window.showTextDocument(uri);
    const doc = editor.document;

    let line = 0;

    for (let i = 0; i < doc.lineCount; i++) {
        const lineText = doc.lineAt(i).text.trim();

        if (lineText.startsWith('import')) {
            line = i + 1;
        }
    }

    await editor.edit(edit => {
        edit.insert(new vscode.Position(line, 0), text);
    });

    await editor.document.save();
};