import { updateImports } from "./forImportLine.js";
import { updateAppUse } from './forUseLine.js';

const fileNameToInsert = "controller.js";

const updateRouteJsFile = ({ appJsPath, endpoint }) => {
    const importLine = `import { postFunc } from "./${endpoint}/${fileNameToInsert}";`;
    const useLine = `router.post('/${endpoint}', express.json(), postFunc);`;

    updateImports({ appJsPath, importLine });

    updateAppUse({
        appJsPath: appJsPath,
        useLine
    });
};

export { updateRouteJsFile };
