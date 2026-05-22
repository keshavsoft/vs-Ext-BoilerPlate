import schemaJson from '../Config/schema.json' with { type: 'json' };

const targetPath = process.env.DataPath;
const tableName = schemaJson.tableName;
const tablePath = `${targetPath}/${tableName}`;

const StartFunc = (req, res, next) => {
    const LocalBody = req.body;

    if (!LocalBody || Object.keys(LocalBody).length === 0) {
        return res.status(400).send("Request body should not be empty.");
    }

    if (Array.isArray(LocalBody)) {
        return res.status(400).send("Remove The Array From The Body.");
    }

    if (typeof LocalBody === 'object' && Object.keys(LocalBody).length === 0) {
        return res.status(400).send("Request body should not be an empty object.");
    }

    next();
};

export { StartFunc };
