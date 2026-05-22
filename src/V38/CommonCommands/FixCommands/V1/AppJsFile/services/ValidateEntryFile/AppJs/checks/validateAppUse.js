// checks/validateAppUse.js
const validateAppUse = (content) => {
    if (!content.includes('app.use')) {
        throw new Error('MISSING_APP_USE');
    }
};

export { validateAppUse };