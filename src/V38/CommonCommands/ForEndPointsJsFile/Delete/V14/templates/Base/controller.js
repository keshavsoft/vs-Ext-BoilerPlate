import { deleteItem } from "./service.js";
import { ConflictError, StorageError } from "./errors.js";

const deleteFunc = ({ req, res, inTableName }) => {
    try {
        const inRequestPk = req.params.pk;

        const message = deleteItem({
            inPk: inRequestPk,
            inTableName
        });

        res.type("application/json").send(message);
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