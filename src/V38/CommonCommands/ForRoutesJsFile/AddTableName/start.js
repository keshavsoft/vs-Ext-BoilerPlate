import { addTableNameCommand as v1 } from './V1/start.js';
import { addTableNameCommand as v2 } from './V2/start.js';
import { addTableNameCommand as v4 } from './V4/start.js';
// import future versions...
function getVersion() {
    // Option 1: config file
    return 'V4';

    // Option 2 (better later):
    // return process.env.VERSION;

    // Option 3 (best):
    // read from extension config / workspace settings
};

export function addTableNameCommand(context) {

    const version = getVersion(); // decide dynamically

    switch (version) {
        case 'V1':
            return v1(context);

        case 'V2':
            return v2(context);

        case 'V4':
            return v4(context);

        default:
            throw new Error(`Unsupported version: ${version}`);
    }
};

