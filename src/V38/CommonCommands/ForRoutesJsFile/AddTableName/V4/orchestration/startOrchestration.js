import { resolveContext } from '../utils/context.js';
import { finalize } from '../utils/response.js';
import { runPrechecks } from '../services/precheck.js';
import { runFeatureOrchestration } from './runFeatureOrchestration.js';
import { openRoutesFile } from '../services/openFile.js';

const fileName = "end-points.js";

export async function startOrchestration({ uri }) {
    try {
        const context = resolveContext(uri);

        runPrechecks({
            targetPath: context.targetPath,
            appJsPath: context.appJsPath
        });

        const folderName = await runFeatureOrchestration({ context, inFileName: fileName });
        if (!folderName) return;

        openRoutesFile(`${context.targetPath}/${folderName}/${fileName}`);

        finalize({
            message: `Endpoint '${folderName}' created 🚀`
        });
    } catch (e) { throw e; }
};