import { readFile } from "./readFile.js";
import { writeFile } from "./writeFile.js";

const targetPath = process.env.DataPath;
const tableName = "";
const tablePath = `${targetPath}/${tableName}`;

const deleteFunc = ({ inPk }) => {
    try {
        const data = readFile({ filePath: tablePath });

        const LocalFindIndex = data.findIndex(e => e.pk === parseInt(inPk));

        data.splice(LocalFindIndex, 1);

        writeFile({
            filePath: tablePath,
            data: data
        });

        return true;
    } finally {

        globalThis.__IMPORT_RUNNING__ = false;

    };
};

export { deleteFunc };