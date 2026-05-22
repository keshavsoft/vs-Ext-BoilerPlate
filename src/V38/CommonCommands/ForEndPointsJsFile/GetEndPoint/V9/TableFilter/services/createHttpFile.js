import fs from "fs";
import path from "path";
import * as vscode from 'vscode';

export const createHttpFile = ({ uri, inTargetPath }) => {
    const workspace = vscode.workspace.workspaceFolders?.[0].uri.fsPath;
    const relative = uri.fsPath.replace(workspace, "").replace(/\\/g, "/");
    
    const content = `GET http://localhost:3000${relative.replace(/\/[^/]*$/, "")}`;

    fs.writeFileSync(path.join(inTargetPath, "rest.http"), content);
};