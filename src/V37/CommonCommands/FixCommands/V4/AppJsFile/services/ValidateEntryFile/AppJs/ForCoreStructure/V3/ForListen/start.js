import * as vscode from 'vscode';
import { insertAtPosition } from './helpers/insertAtPosition.js';

export async function expressListen({ ast, uri }) {
    let hasListen = false;
    let serverVar = null;

    let lastInitNode = null;
    let firstFunctionNode = null;

    // 🔍 Scan AST
    ast.program.body.forEach(node => {

        // ✅ Detect existing listen (ANY .listen)
        if (
            node.type === 'ExpressionStatement' &&
            node.expression?.type === 'CallExpression' &&
            node.expression.callee?.type === 'MemberExpression' &&
            node.expression.callee.property?.name === 'listen'
        ) {
            hasListen = true;
        }

        // ✅ Detect server = http.createServer(app)
        if (node.type === 'VariableDeclaration') {
            node.declarations.forEach(dec => {
                if (
                    dec.init?.type === 'CallExpression' &&
                    dec.init.callee?.object?.name === 'http' &&
                    dec.init.callee?.property?.name === 'createServer'
                ) {
                    serverVar = dec.id.name; // dynamic (server / myServer / etc.)
                }
            });

            lastInitNode = node;
        }

        // ✅ Track init expressions (app.use etc.)
        if (node.type === 'ExpressionStatement') {
            lastInitNode = node;
        }

        // ✅ First function boundary
        if (
            node.type === 'FunctionDeclaration' &&
            !firstFunctionNode
        ) {
            firstFunctionNode = node;
        }

    });

    // 🚫 Already exists
    if (hasListen) return;

    // 🎯 Decide target (server OR app)
    const target = serverVar || 'app';

    const action = await vscode.window.showErrorMessage(
        `Missing ${target}.listen`,
        'Fix Now'
    );

    if (action !== 'Fix Now') return;

    const fix = `\n${target}.listen(3000, () => console.log('Server running'));\n\n`;

    // 🎯 Decide position
    let insertLine;

    if (firstFunctionNode?.loc) {
        insertLine = firstFunctionNode.loc.start.line - 1;
    } else if (lastInitNode?.loc) {
        insertLine = lastInitNode.loc.end.line;
    } else {
        insertLine = 999999; // fallback
    }

    await insertAtPosition(uri, fix, insertLine);
};