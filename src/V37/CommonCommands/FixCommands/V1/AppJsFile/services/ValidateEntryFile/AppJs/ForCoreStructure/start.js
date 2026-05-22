import fs from 'fs';
import { getAst } from './parser.js';
import { appJsRules } from './rulesRegistry.js';

const validateAppJsCoreStructure = async ({ entryFilePath, uri }) => {
    let content = fs.readFileSync(entryFilePath, 'utf-8');
    let ast = getAst(content);

    for (const rule of appJsRules) {
        const { fn, config } = rule;

        await fn({
            ast,
            uri,
            config,
            entryFilePath,
            content
        });
    };

    // 🔥 IMPORTANT: refresh after each rule
    content = fs.readFileSync(entryFilePath, 'utf-8');
    ast = getAst(content);
};

export { validateAppJsCoreStructure };