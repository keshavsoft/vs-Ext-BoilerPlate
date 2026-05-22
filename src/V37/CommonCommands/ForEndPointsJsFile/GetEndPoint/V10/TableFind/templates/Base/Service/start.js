import { readFile } from "./readFile.js";

const targetPath = process.env.DataPath;
const tableName = "";
const tablePath = `${targetPath}/${tableName}`;

const startFunc = ({ inPk }) => {
    let LocalReturnObject = { KTF: false };

    try {

        let data = readFile({ filePath: tablePath });

        const LocalFindIndex = data.find(e => e.pk === parseInt(inPk));

        return LocalFindIndex;
    } catch (err) {
        LocalReturnObject.KReason = `Error occurred: ${err.message}`;
        console.error("Error:", err);
    };

    return LocalReturnObject;
};

export { startFunc };