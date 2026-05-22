import { checkImport } from './V4/handleExpressImport.js';
import { checkInit } from './V4/ForInit/checkInit.js';
import { expressListen } from './V4/ForListen/start.js';
import { checkUse } from './V4/ForUse/checkInit.js';

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
    { fn: checkUse },
    { fn: expressListen }
];