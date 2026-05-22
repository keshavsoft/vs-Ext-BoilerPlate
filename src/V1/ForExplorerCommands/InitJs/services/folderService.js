import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';

export function ensureFolder({ folderName, dirName }) {
    const folderPath = path.join(dirName, folderName);

    if (fs.existsSync(folderPath)) {
        vscode.window.showWarningMessage('⚠️ Folder already exists. Please check and try again.');
        throw new Error('Folder already exists');
    }

    fs.mkdirSync(folderPath);
    return folderPath;
};