// checks/validateAppInit.js
const findString = "listen(";

const validateAppListen = (content) => {
    if (!content.includes(findString)) {
        throw new Error("MISSING_EXPRESS_LISTEN");
    }
};

export { validateAppListen };