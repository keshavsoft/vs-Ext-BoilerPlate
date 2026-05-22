import { startFunc as alterFunc } from './alterFunc.js';

const startFunc = ({ inTargetPath, inTableName }) => {
    const replaceWith = `const filePath = "${inTableName}"`;

    alterFunc({
        appJsPath: `${inTargetPath}/Service/start.js`,
        replacePattern: /const\s+filePath\s*=\s*.*;/,
        useLine: replaceWith
    });
};

export { startFunc };
