// src/.../services/createHttpFile.js
import fs from "fs";
import path from "path";
import * as vscode from "vscode";
import { buildPostPayloadFromSchema } from "./buildPostPayload.js";

export const createHttpFile = ({ inTargetPath, inTableName }) => {
    const workspace =
        vscode.workspace.workspaceFolders?.[0].uri.fsPath;

    const relative = inTargetPath.replace(workspace, "").replace(/\\/g, "/");

    const port = process.env.PORT || 3000;

    // 🔥 build body from schema
    const body = buildPostPayloadFromSchema({
        workspacePath: workspace,
        inTableName
    });

    const content = `
POST http://localhost:${port}${relative}
Content-Type: application/json

${body}
`;

    fs.writeFileSync(path.join(inTargetPath, "rest.http"), content);
};