import { updateImports } from "./forImportLine.js";
import { updateAppUse } from './forUseLine.js';

const fileNameToInsert = "controller.js";
const funcName = "filterFunc";

const updateRouteJsFile = ({ appJsPath, endpoint }) => {
    const importLine = `import { ${funcName} } from "./${endpoint}/${fileNameToInsert}";`;
    const useLine = `router.get('/${endpoint}/:pk', (req, res) => ${funcName}({ req, res, inTableName: tableName }));`

    updateImports({ appJsPath, importLine });

    updateAppUse({
        appJsPath: appJsPath,
        useLine
    });
};

export { updateRouteJsFile };

