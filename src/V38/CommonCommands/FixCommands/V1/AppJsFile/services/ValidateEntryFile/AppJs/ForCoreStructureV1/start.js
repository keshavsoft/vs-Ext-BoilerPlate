// validateAppJsCoreStructure.js
import fs from 'fs';

import { getAst } from './parser.js';
import { expressImport } from './V1/handleExpressImport.js';
import { expressInit } from './V1/handleExpressInit.js';
import { expressUse } from './V1/handleExpressUse.js';
import { expressListen } from './V1/handleExpressListen.js';

const validateAppJsCoreStructure = async ({ entryFilePath, uri }) => {
    const content = fs.readFileSync(entryFilePath, 'utf-8');
    const ast = getAst(content);

    const rules = [
        expressImport,
        expressInit,
        expressUse,
        expressListen
    ];

    for (const rule of rules) {
        await rule(ast, { uri });
    };
};

export { validateAppJsCoreStructure };