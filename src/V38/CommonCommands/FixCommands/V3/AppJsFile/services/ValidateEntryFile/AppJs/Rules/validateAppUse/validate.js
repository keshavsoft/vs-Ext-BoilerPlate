// checks/validateAppInit.js
const findString = "app.use";

const validateAppUse = (content) => {
    if (!content.includes(findString)) {
        throw new Error("MISSING_EXPRESS_USE");
    }
};

export { validateAppUse };