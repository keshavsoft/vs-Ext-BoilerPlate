import { readFile } from "./readFile.js";
import { writeFile } from "./writeFile.js";

const filePath = "";

const startFunc = ({ inPk, inRequestBody }) => {
    try {

        let data = readFile({ filePath });

        const index = data.findIndex(el => el.pk === parseInt(inPk));

        if (index === -1) {
            return false;
        }

        data[index] = {
            ...data[index],
            ...inRequestBody
        };

        writeFile({
            filePath,
            data
        });

        return inPk;

    } finally {

        globalThis.__IMPORT_RUNNING__ = false;

    }
};

export { startFunc };