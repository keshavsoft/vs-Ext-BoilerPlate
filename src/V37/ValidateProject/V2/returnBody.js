// validateExports.js (modular + internal orchestration)

import fs from 'fs';
import { parse } from '@babel/parser';

export const startFunc = (filePath) => {
    const content = readFile(filePath);
    const ast = getAst(content);
    const body = getBody(ast);

    return body;
};

/* ---------- small functions ---------- */

function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

function getAst(content) {
    return parse(content, {
        sourceType: 'module',
        errorRecovery: true,
        allowReturnOutsideFunction: true,
        plugins: ['jsx']
    });
}

function getBody(ast) {
    return ast.program.body;
};
