import fs from "fs";

const StartFunc = () => {
    const targetPath = `${process.env.DataPath}/$TableName.json`;

    try {
        const LocalFileData = fs.readFileSync(targetPath);
        const LocalFileDataAsJson = JSON.parse(LocalFileData);

        return LocalFileDataAsJson;
    } finally {
        globalThis.__IMPORT_RUNNING__ = false;
    }
};

export { StartFunc };