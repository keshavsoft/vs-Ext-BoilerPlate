// src/.../services/buildPostPayload.js
import fs from "fs";
import path from "path";

export const buildPostPayloadFromSchema = ({ workspacePath, inTableName }) => {
    const schemaPath = path.join(
        workspacePath,
        "Config",
        "Schemas",
        `${inTableName}.json`
    );

    if (!fs.existsSync(schemaPath)) return "{}";

    const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));

    const payload = {};

    (schema.columns || []).forEach(col => {
        if (col.isConsider) {
            payload[col.field] = col.defaultValue ?? "";
        }
    });

    return JSON.stringify(payload, null, 2);
};