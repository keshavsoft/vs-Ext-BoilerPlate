// checks/validateExpressImport.js
const validateExpressImport = (content) => {
    if (!(content.includes('import express') || content.includes("require('express')") || content.includes('require("express")'))) {
        throw new Error('MISSING_EXPRESS_IMPORT');
    }
};

export { validateExpressImport };