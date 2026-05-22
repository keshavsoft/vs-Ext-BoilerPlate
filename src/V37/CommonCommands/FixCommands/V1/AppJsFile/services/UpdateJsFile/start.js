import path from 'path';

import { updateAppJs } from './ForAppJs/start.js';
import { updateRouteJsFile } from './ForRouteJs/start.js';

export function updateJsFile({ appJsPath, endpoint }) {
    const fileName = path.basename(appJsPath);

    if (fileName === "app.js") {
        updateAppJs({ appJsPath, endpoint });
    } else if (fileName === "routes.js") {
        updateRouteJsFile({ appJsPath, endpoint });
    };
};
