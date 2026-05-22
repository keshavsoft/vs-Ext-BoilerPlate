import { startFunc as Service } from "./Service/start.js";
import { ConflictError, StorageError } from "./errors.js";

const postFunc = (req, res) => {
    try {
        const inRequestBody = req.body;

        const message = Service({ inRequestBody });

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

export { postFunc };