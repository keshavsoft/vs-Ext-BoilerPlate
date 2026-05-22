import fs from "fs";
import schemaJson from '../Config/schema.json' with { type: 'json' };

const targetPath = process.env.DataPath;
const tableName = schemaJson.tableName;
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