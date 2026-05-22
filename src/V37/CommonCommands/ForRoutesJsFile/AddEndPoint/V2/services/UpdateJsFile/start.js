import path from 'path';

import { updateRouteJsFile } from './ForRouteJs/start.js';

const fileNameToAlter = "routes.js";

export function updateJsFile({ appJsPath, endpoint }) {
    const fileName = path.basename(appJsPath);

    if (fileName === fileNameToAlter) {
        updateRouteJsFile({ appJsPath, endpoint });
    };
};
