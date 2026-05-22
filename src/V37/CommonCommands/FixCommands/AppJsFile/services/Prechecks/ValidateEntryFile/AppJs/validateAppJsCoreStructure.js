// validateAppJsCoreStructure.js
import fs from 'fs';
import { validateExpressImport } from './checks/validateExpressImport.js';
import { validateAppInit } from './checks/validateAppInit.js';
import { validateAppUse } from './checks/validateAppUse.js';
import { validateServerListen } from './checks/validateServerListen.js';

const validateAppJsCoreStructure = ({ entryFilePath }) => {
    const content = fs.readFileSync(entryFilePath, 'utf-8');

    validateExpressImport(content);
    validateAppInit(content);
    validateAppUse(content);
    validateServerListen(content);
};

export { validateAppJsCoreStructure };