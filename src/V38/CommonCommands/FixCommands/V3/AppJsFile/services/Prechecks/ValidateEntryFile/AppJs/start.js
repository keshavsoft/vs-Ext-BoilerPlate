// start.js (unchanged flow)
import { validateEntryFileExists } from './validateEntryFileExists.js';
import { validateAppJsNotEmpty } from './validateAppJsNotEmpty.js';
import { validateAppJsCoreStructure } from './validateAppJsCoreStructure.js';

const validateAppJsStructure = ({ entryFilePath }) => {
    validateEntryFileExists({ entryFilePath });
    validateAppJsNotEmpty({ entryFilePath });
    validateAppJsCoreStructure({ entryFilePath });
};

export { validateAppJsStructure };
