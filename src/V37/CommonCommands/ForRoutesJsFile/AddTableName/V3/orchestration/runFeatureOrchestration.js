// src/V3/AddEndpoint/orchestration/runFeatureOrchestration.js
import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { fileURLToPath } from 'url';
import { copyTemplate } from '../services/copyTemplate.js';
import { updateRouteJsFile } from '../services/UpdateRouteFile/start.js';
import { updateConfigFile } from '../services/updateConfig.js';

export async function runFeatureOrchestration({ context, inFileName }) {
    const returnInputValues = await getEndpoint();
    const endpoint = returnInputValues.folderName;
    const tableName = returnInputValues.tableName;
    if (!endpoint) return null;
    if (!tableName) return null;

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

    updateRouteJsFile({
        appJsPath: localContext.appJsPath, endpoint,
        inFileName
    });

    updateConfigFile({
        inEndpointFolder: localContext.endpointFolder,
        inTableName: tableName
    });

    return { endpoint };
}
// update only this
async function getEndpoint() {

    const folderName = await vscode.window.showInputBox({
        prompt: 'Enter Folder name'
    });
    if (!folderName) return null;

    const cleanFolder = folderName.trim().replace(/[^a-zA-Z0-9-_]/g, '');
    if (!cleanFolder) return null;

    const tableName = await vscode.window.showInputBox({
        prompt: 'Enter Table name (e.g. TasksTable, in Config/Schemas folder)'
    });
    if (!tableName) return null;

    const cleanTableName = tableName.trim().replace(/[^a-zA-Z0-9-_]/g, '');
    if (!cleanTableName) return null;

    return {
        folderName: cleanFolder,
        tableName: cleanTableName
    };

};


// change copy
function copy({ templatePath, routeFilePath, endpointFolder }) {
    if (!fs.existsSync(endpointFolder)) fs.mkdirSync(endpointFolder, { recursive: true });
    copyTemplate({ templatePath, targetPath: routeFilePath });
}