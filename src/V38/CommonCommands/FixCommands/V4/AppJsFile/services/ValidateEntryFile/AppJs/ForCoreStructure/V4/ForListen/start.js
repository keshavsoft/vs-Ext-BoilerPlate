import * as vscode from 'vscode';
import { insertAtPosition } from './helpers/insertAtPosition.js';

export async function expressListen({ ast, uri }) {

    let hasListen = false;
    let serverVar = null;
    let appVar = 'app';

    let lastInitNode = null;

    // 🔍 Scan AST
    ast.program.body.forEach(node => {

        // ✅ Track variable declarations
        if (node.type === 'VariableDeclaration') {

            node.declarations.forEach(dec => {

                // ✅ Detect express app (const app = express())
                if (
                    dec.init?.type === 'CallExpression' &&
                    dec.init.callee?.name === 'express'
                ) {
                    appVar = dec.id.name;
                }

                // ✅ Detect http server (const server = http.createServer(app))
                if (
                    dec.init?.type === 'CallExpression' &&
                    dec.init.callee?.object?.name === 'http' &&
                    dec.init.callee?.property?.name === 'createServer'
                ) {
                    serverVar = dec.id.name;
                }
            });

            lastInitNode = node;
        }

        // ✅ Track last meaningful expression (app.use, etc.)
        if (node.type === 'ExpressionStatement') {
            lastInitNode = node;
        }

        // ✅ Detect existing listen ONLY on app/server
        if (
            node.type === 'ExpressionStatement' &&
            node.expression?.type === 'CallExpression' &&
            node.expression.callee?.type === 'MemberExpression' &&
            node.expression.callee.property?.name === 'listen'
        ) {
            const obj = node.expression.callee.object?.name;

            if (obj === appVar || obj === serverVar) {
                hasListen = true;
            }
        }

    });

    // 🚫 Already exists
    if (hasListen) return;

    const target = serverVar || appVar;

    // 🎯 UX (not error — suggestion)
    const action = await vscode.window.showInformationMessage(
        `Missing ${target}.listen`,
        'Fix Now'
    );

    if (action !== 'Fix Now') return;

    // ✅ Better fix (env support)
    const fix = `\n${target}.listen(process.env.PORT || 3000, () => console.log('Server running'));\n\n`;

    // 🎯 Safe insertion position
    let insertLine = lastInitNode?.loc?.end.line ?? ast.program.body.length;

    await insertAtPosition(uri, fix, insertLine);
};