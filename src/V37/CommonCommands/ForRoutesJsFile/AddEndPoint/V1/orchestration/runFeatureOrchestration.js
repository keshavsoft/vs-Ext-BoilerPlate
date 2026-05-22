// src/V3/AddEndpoint/orchestration/runFeatureOrchestration.js
import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { fileURLToPath } from 'url';
import { copyTemplate } from '../services/copyTemplate.js';
import { updateJsFile } from '../services/UpdateJsFile/start.js';
import { openEndpointsFile } from '../services/openFile.js';

export async function runFeatureOrchestration({ context }) {
    const endpoint = await getEndpoint();
    if (!endpoint) return null;

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
    openEndpointsFile(`${localContext.endpointFolder}`);

    return { endpoint };
}
// update only this
async function getEndpoint() {
    const value = await vscode.window.showInputBox({ prompt: 'Enter endpoint name (e.g. users)' });
    if (!value) return null;

    const clean = value.trim().replace(/[^a-zA-Z0-9-_]/g, '');
    if (!clean) return null;

    return clean;
};

// change copy
function copy({ templatePath, routeFilePath, endpointFolder }) {
    if (!fs.existsSync(endpointFolder)) fs.mkdirSync(endpointFolder, { recursive: true });
    copyTemplate({ templatePath, targetPath: routeFilePath });
}