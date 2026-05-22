import * as vscode from 'vscode';
import { insertAtPosition } from './helpers/insertAtPosition.js';

export async function expressListen({ ast, uri }) {

    const context = scan(ast);

    if (context.hasListen) return;

    const target = context.serverVar || context.appVar;

    const action = await askFix(target);
    if (action !== 'Fix Now') return;

    const fix = buildFix(target);

    await applyFix(uri, fix, context);
};

function scan(ast) {

    let hasListen = false;
    let serverVar = null;
    let appVar = 'app';
    let lastInitNode = null;

    ast.program.body.forEach(node => {

        if (node.type === 'VariableDeclaration') {
            node.declarations.forEach(dec => {

                if (dec.init?.callee?.name === 'express') {
                    appVar = dec.id.name;
                }

                if (
                    dec.init?.callee?.object?.name === 'http' &&
                    dec.init?.callee?.property?.name === 'createServer'
                ) {
                    serverVar = dec.id.name;
                }
            });

            lastInitNode = node;
        }

        if (node.type === 'ExpressionStatement') {
            lastInitNode = node;
        }

        if (
            node.type === 'ExpressionStatement' &&
            node.expression?.callee?.property?.name === 'listen'
        ) {
            const obj = node.expression.callee.object?.name;
            if (obj === appVar || obj === serverVar) {
                hasListen = true;
            }
        }

    });

    return { hasListen, serverVar, appVar, lastInitNode };
};

async function askFix(target) {
    return vscode.window.showInformationMessage(
        `Missing ${target}.listen`,
        'Fix Now'
    );
};

function buildFix(target) {
    return `\n${target}.listen(process.env.PORT || 3000);\n`;
};

async function applyFix(uri, fix, context) {

    let insertLine =
        context.lastInitNode?.loc?.end.line ?? 999;

    await insertAtPosition(uri, fix, insertLine);
};