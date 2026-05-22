import { readFile } from "./readFile.js";
import schemaJson from '../../Config/schema.json' with { type: 'json' };

const targetPath = process.env.DataPath;
const tableName = schemaJson.tableName;
const tablePath = `${targetPath}/${tableName}`;

const deleteFunc = ({ inPk }) => {
    try {
        const data = readFile({ filePath: tablePath });

        const LocalFind = data.find(e => e.pk === parseInt(inPk));

        return LocalFind;
    } finally {

        globalThis.__IMPORT_RUNNING__ = false;

    };
};

export { deleteFunc };