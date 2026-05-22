// src/V3/AddEndpoint/orchestration/runFeatureOrchestration.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { copyTemplate } from '../services/copyTemplate.js';
import { updateJsFile } from '../services/UpdateJsFile/start.js';
import { createHttpFile } from '../services/createHttpFile.js';
import { openFileInEditor } from '../services/openFile.js';

export async function runFeatureOrchestration({ context }) {
    const endpoint = "Find";

    // fix inside localContext
    const localContext = {
        ...context,
        endpointFolder: path.join(context.targetPath, endpoint),
        routeFilePath: path.join(context.targetPath, endpoint),
        templatePath: fileURLToPath(new URL('../templates/Base', import.meta.url))
    };

    // inside runFeatureOrchestration
    copy({
        templatePath: localContext.templatePath,
        routeFilePath: localContext.routeFilePath,
        endpointFolder: localContext.endpointFolder
    });

    updateJsFile({ appJsPath: localContext.appJsPath, endpoint });

    createHttpFile({
        inTargetPath: localContext.endpointFolder
    });

    openFileInEditor({
        inFolderPath: localContext.routeFilePath
    })

    return { endpoint };
};

// change copy
function copy({ templatePath, routeFilePath, endpointFolder }) {
    if (!fs.existsSync(endpointFolder)) fs.mkdirSync(endpointFolder, { recursive: true });
    copyTemplate({ templatePath, targetPath: routeFilePath });
}