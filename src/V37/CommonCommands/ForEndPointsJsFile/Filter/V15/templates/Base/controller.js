import { filterFunc as filterService } from "./Service/start.js";
import { ConflictError, StorageError } from "./errors.js";

const filterFunc = (req, res) => {
    try {
        const inQuery = req.query;

        const message = filterService({ inQuery });

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

export { filterFunc };