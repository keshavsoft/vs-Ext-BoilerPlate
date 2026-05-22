import { finalize, fail } from '../utils/response.js';
import { copyTemplate } from '../services/copyTemplate.js';
import { runPrechecks } from '../services/precheck.js';

export async function startOrchestration(uri) {
    try {
        const targetPath = uri.fsPath;

        runPrechecks({ targetPath });

        copyTemplate({ targetPath });

        finalize({
            message: `Node API initialized successfully 🚀\nFiles created: package.json, app.js\nLocation: ${targetPath}`
        });
    } catch (error) {
        fail(error);
    };
};