// src/V9/createFullEndpoint/services/Prechecks/start.js

import fs from 'fs';
import path from 'path';
import { validateTargetPath } from "./validateTargetPath.js";
import { validateEntryFilePath } from "./ValidateEntryFile/start.js";

const log = (msg) => console.log(`[CreateFullEndpoint][${new Date().toISOString()}] ${msg}`);

const runPrechecks = ({ targetPath, entryFilePath }) => {
    log(`INPUTS → targetPath: ${targetPath}; entryFilePath: ${entryFilePath};`);

    validateTargetPath({ targetPath });
    validateEntryFilePath({ entryFilePath });

    log('PASS: Prechecks completed successfully;');
};

export { runPrechecks };