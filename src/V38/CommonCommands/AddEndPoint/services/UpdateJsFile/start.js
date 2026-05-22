import path from 'path';

import { updateRouteJsFile } from './ForRouteJs/start.js';

export function updateJsFile({ appJsPath, endpoint }) {
    const fileName = path.basename(appJsPath);

    if (fileName === "routes.js") {
        updateRouteJsFile({ appJsPath, endpoint });
    };
};
