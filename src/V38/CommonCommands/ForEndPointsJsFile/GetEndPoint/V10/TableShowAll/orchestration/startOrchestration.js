import { resolveContext } from '../utils/context.js';
import { finalize } from '../utils/response.js';
import { runPrechecks } from '../services/precheck.js';
import { runFeatureOrchestration } from './runFeatureOrchestration.js';

export async function startOrchestration({ uri }) {
    try {
        const context = resolveContext(uri);

        runPrechecks({
            targetPath: context.targetPath,
            appJsPath: context.appJsPath
        });

        const result = await runFeatureOrchestration({
            context, uri
        });

        if (!result) return;

        finalize({
            message: `Endpoint '${result.endpoint}' created 🚀`
        });
    } catch (e) { throw e; }
};