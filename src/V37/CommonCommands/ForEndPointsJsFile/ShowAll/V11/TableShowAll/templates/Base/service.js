import { kschema } from "@keshavsoft/kschema";

const fromJsonPath = ({ inTableName }) => {
    const tableName = inTableName;

    return kschema.table(tableName).get();
};

export { fromJsonPath };