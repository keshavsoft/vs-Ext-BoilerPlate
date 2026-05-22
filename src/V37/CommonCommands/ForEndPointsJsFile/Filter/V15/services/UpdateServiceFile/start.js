import { startFunc as alterFunc } from './alterFunc.js';

const startFunc = ({ inTargetPath, inTableName }) => {
    const replaceWith = `const tableName = "${inTableName}.json"`;

    alterFunc({
        appJsPath: `${inTargetPath}/service.js`,
        replacePattern: /const\s+tableName\s*=\s*.*;/,
        useLine: replaceWith
    });
};

export { startFunc };
