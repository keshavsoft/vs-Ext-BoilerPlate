import fs from "fs";

const targetPath = process.env.DataPath;
const tableName = "";
const tablePath = `${targetPath}/${tableName}`;

const fromJsonPath = () => {
    try {
        const LocalFileData = fs.readFileSync(tablePath);
        const LocalFileDataAsJson = JSON.parse(LocalFileData);

        return LocalFileDataAsJson;
    } finally {
        globalThis.__IMPORT_RUNNING__ = false;
    }
};

export { fromJsonPath };