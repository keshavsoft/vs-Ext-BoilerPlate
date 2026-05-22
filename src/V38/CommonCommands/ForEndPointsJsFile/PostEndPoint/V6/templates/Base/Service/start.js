import { readFile } from "./readFile.js";
import { getNextPk } from "./getNextPk.js";
import { prepareInsert } from "./prepareInsert.js";
import { writeFile } from "./writeFile.js";

const filePath = "";

const startFunc = ({ inRequestBody }) => {
    try {

        const data = readFile({ filePath });

        const nextPk = getNextPk({ data });

        const updatedData = prepareInsert({
            data,
            inRequestBody,
            nextPk
        });

        writeFile({
            filePath,
            data: updatedData
        });

        return nextPk;
    } finally {

        globalThis.__IMPORT_RUNNING__ = false;

    };
};

export { startFunc };