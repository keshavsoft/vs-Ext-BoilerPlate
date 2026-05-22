import { validateEntryFileExists } from './validateEntryFileExists.js';
import { validateAppJsNotEmpty } from './validateAppJsNotEmpty.js';

const validateAppJsStructure = async ({ entryFilePath, context, uri }) => {
    validateEntryFileExists({ entryFilePath });

    const result = await validateAppJsNotEmpty({ entryFilePath, context });
    if (result === 'STOP') return;
};

export { validateAppJsStructure };
