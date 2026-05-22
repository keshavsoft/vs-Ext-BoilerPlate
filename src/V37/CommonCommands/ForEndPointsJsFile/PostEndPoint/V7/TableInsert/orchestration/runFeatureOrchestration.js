import { fileURLToPath } from 'url';
import { copyTemplate } from '../services/copyTemplate.js';
import { updateJsFile } from '../services/UpdateJsFile/start.js';
import { startFunc as UpdateServiceFile } from '../services/UpdateServiceFile/start.js';
import { createHttpFile } from '../services/CreateHttpFile/start.js';

export async function runFeatureOrchestration({ context, inTableName, uri }) {
    const localContext = {
        ...context,
        templatePath: fileURLToPath(new URL('../templates/Base', import.meta.url))
    };

    copyTemplate({
        templatePath: localContext.templatePath,
        targetPath: localContext.targetPath
    });

    updateJsFile({ appJsPath: localContext.appJsPath });

    UpdateServiceFile({
        inTableName,
        inTargetPath: localContext.targetPath
    });

    createHttpFile({
        uri,
        inTargetPath: localContext.targetPath,
        inTableName
    });

    return true;
};
