import { updateImports } from "./forImportLine.js";
import { updateAppUse } from './forUseLine.js';

const updateRouteJsFile = ({ appJsPath }) => {
    const importLine = `import { getFunc } from "./controller.js";`;
    const useLine = `router.get('/:pk', getFunc);`;

    updateImports({ appJsPath, importLine });

    updateAppUse({
        appJsPath: appJsPath,
        useLine
    });
};

export { updateRouteJsFile };
