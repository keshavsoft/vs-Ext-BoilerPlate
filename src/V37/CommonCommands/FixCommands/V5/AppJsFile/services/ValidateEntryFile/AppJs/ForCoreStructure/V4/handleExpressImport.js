import * as vscode from 'vscode';

export async function checkImport({ ast, uri, config }) {

    const hasImport = scan(ast, config.moduleName);
    if (hasImport) return;

    const action = await ask(config.moduleName);
    if (action !== 'Fix Now') return;

    await apply(uri, config.importCode);
};

function scan(ast, moduleName) {
    return ast.program.body.some(node =>
        node.type === 'ImportDeclaration' &&
        node.source.value === moduleName
    );
};

async function ask(moduleName) {
    return vscode.window.showErrorMessage(
        `Missing ${moduleName} import`,
        'Fix Now'
    );
};

async function apply(uri, text) {
    const editor = await vscode.window.showTextDocument(uri);

    await editor.edit(edit => {
        edit.insert(new vscode.Position(0, 0), text);
    });

    await editor.document.save();
};