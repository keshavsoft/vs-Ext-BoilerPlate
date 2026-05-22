import { kschema } from "@keshavsoft/kschema";

const startFunc = ({ inRequestBody, inTableName }) => {
    const tableName = inTableName;

    return kschema.table(tableName).insert(inRequestBody);
};

export { startFunc };