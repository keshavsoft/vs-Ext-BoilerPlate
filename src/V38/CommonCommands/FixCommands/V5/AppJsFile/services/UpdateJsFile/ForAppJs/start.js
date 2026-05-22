import { updateImports } from "./forImportLine.js";
import { updateAppUse } from './forUseLine.js';

const updateAppJs = ({ appJsPath, endpoint }) => {
    const importLine = `import { router as routerFrom${endpoint} } from "./${endpoint}/routes.js";`;
    const useLine = `app.use('/${endpoint}', routerFrom${endpoint});`;

    updateImports({ appJsPath, importLine });

    updateAppUse({
        appJsPath: appJsPath,
        useLine
    });
};

export { updateAppJs };