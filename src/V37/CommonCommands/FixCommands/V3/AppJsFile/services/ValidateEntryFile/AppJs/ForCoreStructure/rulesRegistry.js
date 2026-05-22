import { checkImport } from './V3/handleExpressImport.js';
import { checkInit } from './V3/ForInit/checkInit.js';
// import { expressUse } from './V2/handleExpressUse.js';
import { expressListen } from './V3/ForListen/start.js';
import { checkUse } from './V3/ForUse/checkInit.js';

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