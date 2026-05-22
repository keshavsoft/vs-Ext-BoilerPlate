import * as vscode from 'vscode';

export const fixAppUse = async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const doc = editor.document;
    const text = doc.getText();

    const action = await vscode.window.showErrorMessage(
        'Missing app.use configuration',
        'Fix Now'
    );

    if (action !== 'Fix Now') return;

    const lines = text.split('\n');

    let insertLine = 0;

    const appUseIndex = lines.findIndex(l => l.includes('app.use'));
    if (appUseIndex !== -1) return; // already exists

    const appInitIndex = lines.findIndex(l => l.includes('express()'));
    if (appInitIndex !== -1) {
        insertLine = appInitIndex + 1;
    } else {
        const portIndex = lines.findIndex(l => l.includes('port'));
        insertLine = portIndex !== -1 ? portIndex + 1 : 0;
    }

    await editor.edit(editBuilder => {
        editBuilder.insert(
            new vscode.Position(insertLine, 0),
            `app.use(express.json());\n`
        );
    });
};