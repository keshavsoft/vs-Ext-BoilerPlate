import path from 'path';
import fs from 'fs';

export function resolveContext(uri) {
    const appJsPath = uri.fsPath;
    const targetPath = path.dirname(appJsPath);
    const schemaPath = path.join(targetPath, "Config", "schema.json");
    const data = fs.readFileSync(schemaPath);
    const schemaData = JSON.parse(data);

    return {
        targetPath,
        appJsPath,
        tableName: schemaData.tableName
    };
};