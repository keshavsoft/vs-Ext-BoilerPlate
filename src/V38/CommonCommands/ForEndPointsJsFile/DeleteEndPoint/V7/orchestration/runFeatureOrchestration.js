import { fileURLToPath } from 'url';
import { copyTemplate } from '../services/copyTemplate.js';
import { updateJsFile } from '../services/UpdateJsFile/start.js';

export async function runFeatureOrchestration({ context, inTableName }) {
    const localContext = {
        ...context,
        templatePath: fileURLToPath(new URL('../templates/Base', import.meta.url))
    };

    copyTemplate({
        templatePath: localContext.templatePath,
        targetPath: localContext.targetPath
    });

    updateJsFile({
        appJsPath: localContext.appJsPath
    });

    return true;
};
