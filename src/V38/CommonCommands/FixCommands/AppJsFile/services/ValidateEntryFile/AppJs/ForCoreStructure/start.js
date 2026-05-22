// validateAppJsCoreStructure.js
import fs from 'fs';

import { getAst } from './parser.js';
import { expressImport } from './handleExpressImport.js';
import { expressInit } from './handleExpressInit.js';
import { expressUse } from './handleExpressUse.js';
import { expressListen } from './handleExpressListen.js';

const validateAppJsCoreStructure = async ({ entryFilePath, context, uri }) => {
    const content = fs.readFileSync(entryFilePath, 'utf-8');
    const ast = getAst(content);

    await expressImport(ast, uri);
    await expressInit(ast, uri);
    await expressUse(ast, uri);
    await expressListen(ast, uri);
};

export { validateAppJsCoreStructure };