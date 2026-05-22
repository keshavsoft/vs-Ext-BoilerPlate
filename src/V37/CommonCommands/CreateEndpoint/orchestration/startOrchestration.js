import { resolveContext } from '../utils/context.js';
import { finalize } from '../utils/response.js';
import { runPrechecks } from '../services/precheck.js';
import { runFeatureOrchestration } from './runFeatureOrchestration.js';
import { openRoutesFile } from '../services/openFile.js';

export async function startOrchestration({ uri }) {
    const log = (m) => console.log(`[AddEndpoint][${new Date().toISOString()}] ${m}`);
    try {
        const context = resolveContext(uri);

        runPrechecks({
            targetPath: context.targetPath,
            appJsPath: context.appJsPath
        });

        const result = await runFeatureOrchestration({ context, log });
        if (!result) return;

        openRoutesFile(`${context.targetPath}/${result.endpoint}`);

        finalize({
            message: `Endpoint '${result.endpoint}' created 🚀`
        });
    } catch (e) { log('ERROR'); throw e; }
};