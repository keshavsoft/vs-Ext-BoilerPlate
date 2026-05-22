import * as vscode from 'vscode';

export async function checkInit({ ast, uri }) {
    function hasAppInit(ast) {
        let found = false;

        function visit(node) {
            if (!node || found) return;

            if (
                node.type === 'VariableDeclarator' &&
                node.id?.name === 'app' &&
                node.init?.type === 'CallExpression' &&
                node.init.callee?.name === 'express'
            ) {
                found = true;
                return;
            }

            for (const key in node) {
                const value = node[key];

                if (Array.isArray(value)) {
                    value.forEach(visit);
                } else if (value && typeof value === 'object') {
                    visit(value);
                }
            }
        };

        visit(ast);
        return found;
    };

    const hasInit = hasAppInit(ast);

    if (hasInit) return;

    const action = await vscode.window.showErrorMessage(
        'Missing express app initialization',
        'Fix Now'
    );

    if (action === 'Fix Now') {
        const fix = `\nconst app = express();`;

        await insertAfterImports(uri, fix);

        return; // 🔥 IMPORTANT
    };
};

async function insertAfterImports(uri, text) {
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

    await editor.document.save(); // ✅ ADD THIS
};