// checks/validateServerListen.js
const validateServerListen = (content) => {
    if (!content.includes('listen(')) {
        throw new Error('MISSING_SERVER_LISTEN');
    }
};

export { validateServerListen };