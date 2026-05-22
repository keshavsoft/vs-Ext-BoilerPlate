import fs from 'fs';
import path from 'path';
import { validateAppJsStructure } from "./AppJs/start.js";

const validateEntryFilePath = ({ entryFilePath, context, uri }) => {
    if (!entryFilePath || !fs.existsSync(entryFilePath)) {
        throw new Error('ENTRY_FILE_MISSING');
    };

    const fileName = path.basename(entryFilePath);

    if (fileName !== 'app.js') {
        throw new Error('INVALID_ENTRY_FILE');
    };

    validateAppJsStructure({ entryFilePath, context, uri });
};

export { validateEntryFilePath };