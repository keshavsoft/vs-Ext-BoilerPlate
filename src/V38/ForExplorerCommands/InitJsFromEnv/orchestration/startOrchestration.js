import { finalize, fail } from '../utils/response.js';
import { copyTemplate } from '../services/copyTemplate.js';
import { runPrechecks } from '../services/precheck.js';
import { openEntryFile } from '../services/openFile.js';

const templatePath = '../../../../CommonTemplates/BaseWithVersions/V2';

export async function startOrchestration(uri) {
    const log = (msg) => console.log(`[${new Date().toISOString()}] ${msg}`);
    try {
        const targetPath = uri.fsPath; log('Path resolved');

        runPrechecks({
            targetPath,
            inTemplatePath: templatePath
        }); log('Prechecks passed');

        copyTemplate({
            targetPath,
            inTemplatePath: templatePath
        });

        openEntryFile(targetPath);

        finalize({
            message: `Node API initialized successfully 🚀\nFiles created: package.json, app.js\nLocation: ${targetPath}`
        });
    } catch (error) {
        fail(error);
    };
};