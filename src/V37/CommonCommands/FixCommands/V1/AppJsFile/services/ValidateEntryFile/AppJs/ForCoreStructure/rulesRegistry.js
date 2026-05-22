import { checkImport } from './V1/handleExpressImport.js';
import { checkInit } from './V1/ForInit/checkInit.js';
import { expressUse } from './V1/handleExpressUse.js';
import { expressListen } from './V1/handleExpressListen.js';

export const appJsRules = [
    {
        fn: checkImport,
        config: {
            moduleName: 'express',
            importCode: "import express from 'express';\n"
        }
    },
    {
        fn: checkInit,
        config: {
            variableName: 'app',
            initCode: 'express',
            fixCode: 'const app = express();'
        }
    },
    { fn: expressUse },
    { fn: expressListen }
];