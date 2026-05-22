// validateExports.js (modular + internal orchestration)

import { startFunc as returnBody } from './returnBody.js';
import { startFunc as checkEmpty } from './Checks/checkEmpty.js';
import { startFunc as checkHasExport } from './Checks/checkHasExport.js';
import { startFunc as checkExportIsLast } from './Checks/checkExportIsLast.js';

export function validateExports(filePath) {
    const body = returnBody(filePath);
    if (!body) return { success: false, message: 'Failed to parse file' };

    const checks = [
        checkEmpty,
        checkHasExport,
        checkExportIsLast
    ];

    for (const fn of checks) {
        const res = fn(body);
        if (!res.success) return res;
    };

    return { success: true, message: 'All checks passed', filePath };
};
