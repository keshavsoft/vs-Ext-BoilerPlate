import { kschema } from "@keshavsoft/kschema";

const startFunc = ({ inRequestBody, inTableName }) => {
    const tableName = inTableName;

    return kschema.table(tableName).mutate.insertGenPk(inRequestBody);
};

export { startFunc };
