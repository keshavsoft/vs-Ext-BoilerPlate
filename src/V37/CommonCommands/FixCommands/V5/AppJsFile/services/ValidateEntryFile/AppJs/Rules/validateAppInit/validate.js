// checks/validateAppInit.js
const findString = "express()";

const validateAppInit = (content) => {
    if (!content.includes(findString)) {
        throw new Error("MISSING_EXPRESS_INIT");
    }
};

export { validateAppInit };