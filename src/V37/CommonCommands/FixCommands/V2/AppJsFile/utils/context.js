// src/V3/AddEndpoint/utils/context.js
import path from 'path';

export function resolveContext(uri) {
    const entryFilePath = uri.fsPath;
    const targetPath = path.dirname(entryFilePath);

    return {
        targetPath,
        entryFilePath
    };
};