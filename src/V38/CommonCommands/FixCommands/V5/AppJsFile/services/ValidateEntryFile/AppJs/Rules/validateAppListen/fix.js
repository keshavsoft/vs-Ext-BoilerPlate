import * as vscode from 'vscode';

/* ---------- helpers ---------- */

const shouldFix = async () => {
    const action = await vscode.window.showErrorMessage(
        'Missing server.listen configuration',
        'Fix Now'
    );
    return action === 'Fix Now';
};

const alreadyExists = (lines) => {
    return lines.some(l => l.includes('server.listen'));
};

const resolveInsertLine1 = (lines) => {
    let insertLine = lines.length;

    const portIndex = lines.findIndex(l => l.includes('port'));
    if (portIndex !== -1) {
        return portIndex + 1;
    }

    const serverIndex = lines.findIndex(l => l.includes('createServer'));
    if (serverIndex !== -1) {
        return serverIndex + 1;
    }

    return insertLine;
};
const resolveInsertLine2 = (lines) => {
    let insertLine = lines.length;

    // 🎯 strict match for actual port declaration
    const portIndex = lines.findIndex(l =>
        l.includes('const port') || l.includes('var port')
    );

    if (portIndex !== -1) {
        return portIndex + 1;
    }

    const serverIndex = lines.findIndex(l => l.includes('createServer'));
    if (serverIndex !== -1) {
        return serverIndex + 1;
    }

    return insertLine;
};
const resolveInsertLine = (lines) => lines.length;
const applyInsert = async (editor, insertLine) => {
    await editor.edit(editBuilder => {
        editBuilder.insert(
            new vscode.Position(insertLine, 0),
            `\nserver.listen(port, () => {
    console.log(\`Server running on port \${port}\`);
});\n`
        );
    });
};

/* ---------- main ---------- */

export const fixServerListen = async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const text = editor.document.getText();
    const lines = text.split('\n');

    if (alreadyExists(lines)) return;

    const proceed = await shouldFix();
    if (!proceed) return;

    const insertLine = resolveInsertLine(lines);
    await applyInsert(editor, insertLine);
};