// src/V3/AddEndpoint/orchestration/runFeatureOrchestration.js
import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { fileURLToPath } from 'url';
import { copyTemplate } from '../services/copyTemplate.js';
import { updateRouteJsFile } from '../services/UpdateRouteFile/start.js';
import { updateConfigFile } from '../services/updateConfig.js';
import { updateEndPointsFile } from '../services/updateEndPointsFile.js';

export async function runFeatureOrchestration({ context, inFileName }) {
    const { folderName, tableName } = await getFolderAndTable();

    // fix inside localContext
    const localContext = {
        ...context,
        endpointFolder: path.join(context.targetPath, folderName),
        routeFilePath: path.join(context.targetPath, folderName),
        templatePath: fileURLToPath(new URL('../templates/Base', import.meta.url)),
        endpointsFilePath: path.join(context.targetPath, folderName, "end-points.js")
    };

    // inside runFeatureOrchestration
    copy({
        templatePath: localContext.templatePath,
        routeFilePath: localContext.routeFilePath,
        endpointFolder: localContext.endpointFolder
    });

    updateRouteJsFile({
        appJsPath: localContext.appJsPath,
        inTableName: tableName,
        inFolderName: folderName,
        inFileName
    });

    updateConfigFile({
        inEndpointFolder: localContext.endpointFolder,
        inTableName: tableName
    });

    updateEndPointsFile({
        filePath: localContext.endpointsFilePath,
        inTableName: tableName
    });

    return folderName;
}

async function getFolderAndTable() {
    const input = await vscode.window.showInputBox({
        prompt: "Enter FolderName and TableName",
        placeHolder: "Users Tasks"
    });

    if (!input) return null;

    const clean = input.trim();

    const separators = [' ', '.', ':'];

    let folderName = null;
    let tableName = null;

    for (const sep of separators) {
        if (clean.includes(sep)) {
            const parts = clean.split(sep).map(p => p.trim()).filter(Boolean);

            if (parts.length >= 2) {
                folderName = parts[0];
                tableName = parts[1];
                break;
            }
        }
    }

    // 👉 If only one value → use same for both
    if (!folderName) {
        folderName = clean;
        tableName = clean;
    }

    // sanitize
    folderName = folderName.replace(/[^a-zA-Z0-9_]/g, '');
    tableName = tableName.replace(/[^a-zA-Z0-9_]/g, '');

    return {
        folderName,
        tableName
    };
};

// change copy
function copy({ templatePath, routeFilePath, endpointFolder }) {
    if (!fs.existsSync(endpointFolder)) fs.mkdirSync(endpointFolder, { recursive: true });
    copyTemplate({ templatePath, targetPath: routeFilePath });
}