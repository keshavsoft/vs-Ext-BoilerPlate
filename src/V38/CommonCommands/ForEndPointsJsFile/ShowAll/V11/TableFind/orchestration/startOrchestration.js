import { resolveContext } from '../utils/context.js';
import { finalize } from '../utils/response.js';
import { runPrechecks } from '../services/precheck.js';
import { runFeatureOrchestration } from './runFeatureOrchestration.js';

export async function startOrchestration({ uri, inTableFind }) {
    try {
        const localTableName = inTableFind;
        const context = resolveContext(uri);

        runPrechecks({
            targetPath: context.targetPath,
            appJsPath: context.appJsPath
        });

        const result = await runFeatureOrchestration({
            context,
            inTableName: localTableName, uri
        });

        if (!result) return;

        finalize({
            message: `Endpoint '${result.endpoint}' created 🚀`
        });
    } catch (e) { throw e; }
};