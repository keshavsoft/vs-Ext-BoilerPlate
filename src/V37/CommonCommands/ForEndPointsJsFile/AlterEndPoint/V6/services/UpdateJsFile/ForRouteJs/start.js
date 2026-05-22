import { updateImports } from "./forImportLine.js";
import { updateAppUse } from './forUseLine.js';

const updateRouteJsFile = ({ appJsPath }) => {
    const importLine = `import { alterFunc } from "./controller.js";`;
    const useLine = `router.post('/:pk', alterFunc);`;

    updateImports({ appJsPath, importLine });

    updateAppUse({
        appJsPath: appJsPath,
        useLine
    });
};

export { updateRouteJsFile };
