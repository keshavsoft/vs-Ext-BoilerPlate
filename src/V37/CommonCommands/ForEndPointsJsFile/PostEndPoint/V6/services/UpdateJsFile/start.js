import path from 'path';

import { updateRouteJsFile } from './ForRouteJs/start.js';
const fileNameToSearch = "endpoints.js";

export function updateJsFile({ appJsPath }) {
    const fileName = path.basename(appJsPath);

    if (fileName === fileNameToSearch) {
        updateRouteJsFile({ appJsPath });
    };
};
