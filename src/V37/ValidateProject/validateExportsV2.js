// validateExports.js (modular + internal orchestration)

import fs from 'fs';
import { parse } from '@babel/parser';

export function validateExports(filePath) {
    const content = readFile(filePath);
    const ast = getAst(content);
    const body = getBody(ast);

    const emptyCheck = checkEmpty(body);
    if (!emptyCheck.success) return emptyCheck;

    const exportCheck = checkHasExport(body);
    if (!exportCheck.success) return exportCheck;

    return checkExportIsLast(body);
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
}

function checkEmpty(body) {
    if (!body.length) {
        return { success: false, message: 'Empty file' };
    }
    return { success: true };
}

function checkHasExport(body) {
    const hasExport = body.some(node =>
        node.type === 'ExportNamedDeclaration' ||
        node.type === 'ExportDefaultDeclaration'
    );

    if (!hasExport) {
        return { success: false, message: 'No export found' };
    }

    return { success: true };
}

function checkExportIsLast(body) {
    const lastNode = body[body.length - 1];

    const isLast =
        lastNode.type === 'ExportNamedDeclaration' ||
        lastNode.type === 'ExportDefaultDeclaration';

    return {
        success: isLast,
        message: isLast
            ? 'Export is last statement'
            : 'Export is NOT last statement'
    };
};