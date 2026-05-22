import { updateImports } from "./forImportLine.js";
import { updateAppUse } from './forUseLine.js';

const updateRouteJsFile = ({ appJsPath }) => {
    const importLine = `import { deleteFunc } from "./controller.js";`;
    const useLine = `router.delete('/:pk', deleteFunc);`;

    updateImports({ appJsPath, importLine });

    updateAppUse({
        appJsPath: appJsPath,
        useLine
    });
};

export { updateRouteJsFile };
