import { resolveContext } from '../utils/context.js';
import { finalize } from '../utils/response.js';
import { runPrechecks } from '../services/precheck.js';
import { runFeatureOrchestration } from './runFeatureOrchestration.js';

export async function startOrchestration({ uri, instrategy, inTableName = "" }) {
    const log = (m) => console.log(`[AddEndpoint][${new Date().toISOString()}] ${m}`);
    try {
        const context = resolveContext(uri);

        runPrechecks({
            targetPath: context.targetPath,
            appJsPath: context.appJsPath
        });

        const result = await runFeatureOrchestration({ context, log, instrategy, inTableName, uri });
        if (!result) return;

        finalize({
            message: `Endpoint '${result.endpoint}' created 🚀`
        });
    } catch (e) { log('ERROR'); throw e; }
};