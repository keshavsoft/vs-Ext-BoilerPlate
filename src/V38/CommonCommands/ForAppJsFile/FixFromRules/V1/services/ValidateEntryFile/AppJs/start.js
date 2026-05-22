import { validateEntryFileExists } from './validateEntryFileExists.js';
import { validateAppJsCoreStructure } from './ForCoreStructure/start.js';

const validateAppJsStructure = async ({ entryFilePath, uri }) => {
    validateEntryFileExists({ entryFilePath });

    await validateAppJsCoreStructure({ entryFilePath, uri });
};

export { validateAppJsStructure };
