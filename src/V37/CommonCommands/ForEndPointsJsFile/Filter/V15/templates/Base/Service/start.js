import { readFile } from "./readFile.js";
import schemaJson from '../../Config/schema.json' with { type: 'json' };

const targetPath = process.env.DataPath;
const tableName = schemaJson.tableName;
const tablePath = `${targetPath}/${tableName}`;

const filterFunc = ({ inQuery }) => {
    try {
        const data = readFile({ filePath: tablePath });

        const filteredData = data.filter(row => {
            return Object.entries(inQuery).every(([key, value]) => {
                return String(row[key]) === String(value);
            });
        });

        return filteredData;
    } finally {

        globalThis.__IMPORT_RUNNING__ = false;

    };
};

export { filterFunc };