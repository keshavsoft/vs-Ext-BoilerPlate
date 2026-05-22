import { readFile } from "./readFile.js";
import { writeFile } from "./writeFile.js";

const filePath = "";

const StartFunc = ({ inPk }) => {
    let LocalReturnObject = { KTF: false };

    try {

        let data = readFile({ filePath });

        const LocalFindIndex = data.findIndex(e => e.pk === parseInt(inPk));

        if (LocalFindIndex === -1) {
            LocalReturnObject.KReason = `Not found data with pk:${inPk}.`;
            return LocalReturnObject;
        }

        data.splice(LocalFindIndex, 1);

        data = data.map(item =>
            Object.fromEntries(
                Object.entries(item).filter(([key, value]) => value !== null)
            )
        );
        writeFile({
            filePath,
            data
        });

        LocalReturnObject.KTF = true;
        LocalReturnObject.JsonData = `Deleted successfully with pk:${inPk}`;
    } catch (err) {
        LocalReturnObject.KReason = `Error occurred: ${err.message}`;
        console.error("Error:", err);
    }

    return LocalReturnObject;
};

export { StartFunc };