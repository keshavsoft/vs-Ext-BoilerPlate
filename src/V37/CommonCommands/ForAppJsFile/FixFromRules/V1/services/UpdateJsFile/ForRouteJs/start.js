import { updateImports } from "./forImportLine.js";
import { updateAppUse } from './forUseLine.js';

const updateRouteJsFile = ({ appJsPath, endpoint }) => {
    const importLine = `import { router as routerFrom${endpoint} } from "./${endpoint}/routes.js";`;
    const useLine = `router.use('/${endpoint}', routerFrom${endpoint});`;

    updateImports({ appJsPath, importLine });

    updateAppUse({
        appJsPath: appJsPath,
        useLine
    });
};

export { updateRouteJsFile };
