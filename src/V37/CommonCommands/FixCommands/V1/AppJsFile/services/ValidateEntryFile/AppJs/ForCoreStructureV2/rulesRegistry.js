import { expressImport } from './V1/handleExpressImport.js';
import { expressInit } from './V1/handleExpressInit.js';
import { expressUse } from './V1/handleExpressUse.js';
import { expressListen } from './V1/handleExpressListen.js';

export const appJsRules = [
    expressImport,
    expressInit,
    expressUse,
    expressListen
];