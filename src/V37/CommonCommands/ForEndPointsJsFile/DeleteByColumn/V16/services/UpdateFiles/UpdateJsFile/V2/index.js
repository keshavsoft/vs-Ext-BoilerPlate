import updateImports from "./updateImports/index.js";
import updateAppUse from "./updateUse/index.js";

export function updateJsFile({ appJsPath, endpoint }) {
    updateImports({ appJsPath, endpoint });
    updateAppUse({ appJsPath, endpoint });
};