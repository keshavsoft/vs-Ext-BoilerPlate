import fs from "fs";
import { readFile } from "./readFile.js";

const targetPath = process.env.DataPath;
const tableName = "BillsTable.json";
const tablePath = `${targetPath}/${tableName}`;

// 🔥 Load schema
const getSchema = () => {
    const schemaPath = `${process.cwd()}/Config/Schemas/BillsTable.json`;

    const raw = fs.readFileSync(schemaPath, "utf-8");
    const json = JSON.parse(raw);

    const schemaMap = {};

    json.columns.forEach(col => {
        if (col.type === "text") schemaMap[col.field] = "string";
        else if (col.type === "number") schemaMap[col.field] = "number";
        else if (col.type === "boolean") schemaMap[col.field] = "boolean";
        else schemaMap[col.field] = "string";
    });

    return schemaMap;
};

const startFunc = ({ filters }) => {

    try {
        const data = readFile({ filePath: tablePath });

        const schema = getSchema();

        const parseValue = (key, value) => {
            if (schema[key] === "number") return Number(value);
            if (schema[key] === "boolean") return value === "true";
            return value;
        };

        const filteredRows = data.filter(row =>
            Object.keys(filters).every(key =>
                row[key] === parseValue(key, filters[key])
            )
        );

        return filteredRows;

    } catch (err) {
        console.error(err);
        return { KTF: false, KReason: err.message };
    }
};

export { startFunc };