import { updateImports } from "./forImportLine.js";
import { updateRouteFile } from './forUseLine.js';
const findName = "router";

export function updateRouteJsFile({ appJsPath, inFileName, inFolderName, inTableName }) {
    const importLine = `import { router as routerFrom${inTableName} } from "./${inFolderName}/${inFileName}";`;
    const useLine = `${findName}.use('/${inFolderName}', routerFrom${inTableName});`;

    updateImports({ appJsPath, importLine });

    updateRouteFile({
        routeJsPath: appJsPath,
        useLine
    });
};
