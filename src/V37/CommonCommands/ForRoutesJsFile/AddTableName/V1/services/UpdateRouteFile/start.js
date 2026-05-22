import { updateImports } from "./forImportLine.js";
import { updateRouteFile } from './forUseLine.js';
const findName = "router";

export function updateRouteJsFile({ appJsPath, endpoint }) {
    const importLine = `import { router as routerFrom${endpoint} } from "./${endpoint}/routes.js";`;
    const useLine = `${findName}.use('/${endpoint}', routerFrom${endpoint});`;

    updateImports({ appJsPath, importLine });

    updateRouteFile({
        routeJsPath: appJsPath,
        useLine
    });
};
