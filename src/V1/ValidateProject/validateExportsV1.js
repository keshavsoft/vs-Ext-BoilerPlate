// FIXED validateExports.js

import fs from 'fs';
import { parse } from '@babel/parser';

export function validateExports(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    const ast = parse(content, {
        sourceType: 'module',
        errorRecovery: true
    });

    const body = ast.program.body;

    if (!body.length) {
        return { success: false, message: 'Empty file' };
    }

    const lastNode = body[body.length - 1];

    const hasExport = body.some(node =>
        node.type === 'ExportNamedDeclaration' ||
        node.type === 'ExportDefaultDeclaration'
    );

    if (!hasExport) {
        return { success: false, message: 'No export found' };
    }

    const isLast =
        lastNode.type === 'ExportNamedDeclaration' ||
        lastNode.type === 'ExportDefaultDeclaration';

    return {
        success: isLast,
        message: isLast
            ? 'Export is last statement'
            : 'Export is NOT last statement'
    };
}