import fs from "fs";

import schemaJson from '../Config/schema.json' with { type: 'json' };

const SchemaPath = process.env.SchemaPath;
const tableName = schemaJson.tableName;
const tablePath = `${SchemaPath}/${tableName}`;

export const validateDeleteQuery = (req, res, next) => {
    const query = req.query;

    // check if query exists and not empty
    if (!query || Object.keys(query).length === 0) {
        return res.status(400).json({
            error: "Query parameters are required for delete operation"
        });
    };

    const data = fs.readFileSync(tablePath);
    const dataAsJson = JSON.parse(data);

    const allowedFields = dataAsJson.columns.map(col => col.field);

    for (let key of Object.keys(query)) {
        if (!allowedFields.includes(key)) {
            return res.status(400).json({
                error: `Invalid column: ${key}`
            });
        }
    };

    next();
};