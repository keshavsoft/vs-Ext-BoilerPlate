import { fileURLToPath } from 'url';
import { copyTemplate } from '../services/copyTemplate.js';
import { updateJsFile } from '../services/UpdateJsFile/start.js';
import { createHttpFile } from '../services/createHttpFile.js';

export async function runFeatureOrchestration({ context, uri }) {
    const localContext = {
        ...context,
        templatePath: fileURLToPath(new URL('../templates/Base', import.meta.url))
    };

    copyTemplate({
        templatePath: localContext.templatePath,
        targetPath: localContext.targetPath
    });

    updateJsFile({ appJsPath: localContext.appJsPath });

    createHttpFile({
        uri,
        inTargetPath: localContext.targetPath
    });

    return true;
};
