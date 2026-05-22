import { readFile } from "./readFile.js";
import { getNextPk } from "./getNextPk.js";
import { prepareInsert } from "./prepareInsert.js";
import { writeFile } from "./writeFile.js";
import schemaJson from '../../Config/schema.json' with { type: 'json' };

const targetPath = process.env.DataPath;
const tableName = schemaJson.tableName;
const tablePath = `${targetPath}/${tableName}`;

const startFunc = ({ inRequestBody }) => {
    try {

        const data = readFile({ filePath: tablePath });

        const nextPk = getNextPk({ data });

        const updatedData = prepareInsert({
            data,
            inRequestBody,
            nextPk
        });

        writeFile({
            filePath: tablePath,
            data: updatedData
        });

        return nextPk;
    } finally {

        globalThis.__IMPORT_RUNNING__ = false;

    };
};

export { startFunc };