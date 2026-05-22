// checks/validateAppInit.js
const validateAppInit = (content) => {
    if (!content.includes('express()')) {
        throw new Error('MISSING_APP_INIT');
    }
};

export { validateAppInit };