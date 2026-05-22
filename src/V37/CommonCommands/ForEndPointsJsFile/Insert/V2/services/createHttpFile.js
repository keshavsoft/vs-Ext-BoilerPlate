import fs from "fs";
import path from "path";
import * as vscode from 'vscode';

export const createHttpFile = ({ inTargetPath }) => {
    const workspace = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    const relative = inTargetPath.replace(workspace, "").replace(/\\/g, "/");

    const content = `GET http://localhost:3000${relative}`;

    fs.writeFileSync(path.join(inTargetPath, "rest.http"), content);
};