import { StartFunc as Service } from "./Service/start.js";
import { ConflictError, StorageError } from "./errors.js";

const deleteFunc = (req, res) => {
    try {
        const inRequestPk = req.params.pk;

        const message = Service({ inPk: inRequestPk });

        // res.send(message);
        // res.send(String(message));
        res.status(200).send(message.JsonData);

    } catch (err) {

        if (err instanceof ConflictError)
            return res.status(409).send(err.message);

        if (err instanceof StorageError)
            return res.status(500).send("Failed to persist data");

        console.error(err);
        res.status(500).send("Unexpected error");
    }
};

export { deleteFunc };