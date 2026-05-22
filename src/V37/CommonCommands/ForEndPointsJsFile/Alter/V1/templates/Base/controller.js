import { deleteItem as Service } from "./Service.js";
import { ConflictError, StorageError } from "./errors.js";

const alterFunc = ({ req, res, inTableName }) => {
    try {
        const inRequestBody = req.body;
        const inParamsPk = req.params.pk;

        const message = Service({ inPk: inParamsPk, inRequestBody, inTableName });

        res.type("text/plain").send(String(message))
    } catch (err) {

        if (err instanceof ConflictError)
            return res.status(409).send(err.message);

        if (err instanceof StorageError)
            return res.status(500).send("Failed to persist data");

        console.error(err);
        res.status(500).send("Unexpected error");
    }
};

export { alterFunc };