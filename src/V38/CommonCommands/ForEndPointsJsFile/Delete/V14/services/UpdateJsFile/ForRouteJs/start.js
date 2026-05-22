import { updateImports } from "./forImportLine.js";
import { updateAppUse } from './forUseLine.js';

const fileNameToInsert = "controller.js";

const updateRouteJsFile = ({ appJsPath, endpoint }) => {
    const str = endpoint;
    const smallLetterStart = str[0].toLowerCase() + str.slice(1);

    const importLine = `import { ${smallLetterStart}Func } from "./${endpoint}/${fileNameToInsert}";`;
    const useLine = `router.delete('/${endpoint}/:pk', (req, res) => ${smallLetterStart}Func({ req, res, inTableName: tableName }));`

    updateImports({ appJsPath, importLine });

    updateAppUse({
        appJsPath: appJsPath,
        useLine
    });
};

export { updateRouteJsFile };

