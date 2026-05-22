import { scan } from './helpers/scan.js';
import { askFix } from './helpers/askFix.js';
import { buildFix } from './helpers/buildFix.js';
import { applyFix } from './helpers/applyFix.js';

export async function expressListen({ ast, uri }) {

    const context = scan(ast);

    if (context.hasListen) return;

    const target = context.serverVar || context.appVar;

    const action = await askFix(target);
    if (action !== 'Fix Now') return;

    const fix = buildFix(target);

    await applyFix(uri, fix, context);
};
