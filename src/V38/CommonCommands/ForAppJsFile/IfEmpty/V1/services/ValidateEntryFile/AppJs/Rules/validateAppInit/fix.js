// fix.js
import * as vscode from 'vscode';

export const fixAppInit = async () => {
    const editor = vscode.window.activeTextEditor;
    const doc = editor.document;
    const text = doc.getText();

    const action = await vscode.window.showErrorMessage(
        'Missing app initialization (express())',
        'Fix Now'
    );
    if (action !== 'Fix Now') return;

    const lines = text.split('\n');

    let insertLine = 0;

    const appUseIndex = lines.findIndex(l => l.includes('app.use'));
    if (appUseIndex !== -1) {
        insertLine = appUseIndex;
    } else {
        const portIndex = lines.findIndex(l => l.includes('port'));
        insertLine = portIndex !== -1 ? portIndex + 1 : 0;
    }

    await editor.edit(editBuilder => {
        editBuilder.insert(
            new vscode.Position(insertLine, 0),
            `const app = express();\n`
        );
    });
};