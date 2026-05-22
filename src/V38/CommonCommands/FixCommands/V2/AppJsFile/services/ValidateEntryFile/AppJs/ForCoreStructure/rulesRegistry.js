import { checkImport } from './V2/handleExpressImport.js';
import { checkInit } from './V2/ForInit/checkInit.js';
// import { expressUse } from './V2/handleExpressUse.js';
import { expressListen } from './V2/handleExpressListen.js';
import { checkUse } from './V2/ForUse/checkInit.js';

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