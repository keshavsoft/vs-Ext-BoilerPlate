import { fileURLToPath } from 'url';
import { copyTemplate } from '../services/copyTemplate.js';
import { updateJsFile } from '../services/UpdateJsFile/start.js';
import { startFunc as UpdateServiceFile } from '../services/UpdateServiceFile/start.js';
import { createHttpFile } from '../services/createHttpFile.js';

export async function runFeatureOrchestration({ context, instrategy, inTableName, uri }) {
    const localContext = {
        ...context,
        templatePath: fileURLToPath(new URL('../templates/Base', import.meta.url))
    };

    copyTemplate({
        templatePath: localContext.templatePath,
        targetPath: localContext.targetPath
    });

    updateJsFile({ appJsPath: localContext.appJsPath });

    switch (instrategy) {
        case "HARD_CODED_TABLE":
            UpdateServiceFile({
                inTableName,
                inTargetPath: localContext.targetPath
            });
        case "TABLE_PATH":
            UpdateServiceFile({
                inTableName,
                inTargetPath: localContext.targetPath
            });

            break;
        default:
            break;
    };

    createHttpFile({
        uri,
        inTargetPath: localContext.targetPath
    });

    return true;
};
