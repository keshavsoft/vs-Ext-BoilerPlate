import { startFunc as alterFunc } from './alterFunc.js';

const startFunc = ({ inTargetPath, inTableName }) => {
    const replaceWith = `const targetPath = "${inTableName}"`;

    alterFunc({
        appJsPath: `${inTargetPath}/service.js`,
        replacePattern: /const\s+targetPath\s*=\s*.*;/,
        useLine: replaceWith
    });
};

export { startFunc };
