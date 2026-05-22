import fs from "fs";
import path from "path";

export function updateConfigFile({ inEndpointFolder, inTableName }) {
    const filePath = path.join(inEndpointFolder, "Config", "schema.json");

    // Read Synchronously
    const rawData = fs.readFileSync(filePath);
    const data = JSON.parse(rawData);
    data.tableName = `${inTableName}.json`;

    // // Write Synchronously
    const jsonString = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonString);

};
