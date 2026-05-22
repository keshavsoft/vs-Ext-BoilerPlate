import { parse } from '@babel/parser';

export function getAst(content) {
    return parse(content, {
        sourceType: 'module',
        errorRecovery: true
    });
};