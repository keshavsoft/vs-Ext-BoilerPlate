import { updateImports } from "./forImportLine.js";
import { updateAppUse } from './forUseLine.js';

const updateRouteJsFile = ({ appJsPath }) => {
    const importLine = `import { postFunc } from "./controller.js";`;
    const useLine = `router.post('/', postFunc);`;

    updateImports({ appJsPath, importLine });

    updateAppUse({
        appJsPath: appJsPath,
        useLine
    });
};

export { updateRouteJsFile };
