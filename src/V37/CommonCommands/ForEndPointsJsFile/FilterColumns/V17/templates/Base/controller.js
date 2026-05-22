import { filterItems } from "./service.js";
import { ConflictError, StorageError } from "./errors.js";

const filterColumnsFunc = ({ req, res, inTableName }) => {
    try {
        const requestQuery = req.query;

        const message = filterItems({
            inRequestQuery: requestQuery,
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

export { filterColumnsFunc };