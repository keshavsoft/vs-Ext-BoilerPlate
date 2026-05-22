import fs from 'fs';
import { getAst } from './parser.js';
import { appJsRules } from './rulesRegistry.js';

const validateAppJsCoreStructure = async ({ entryFilePath, uri }) => {
    const content = fs.readFileSync(entryFilePath, 'utf-8');
    const ast = getAst(content);

    for (const rule of appJsRules) {
        await rule(ast, { uri });
    };
};

export { validateAppJsCoreStructure };