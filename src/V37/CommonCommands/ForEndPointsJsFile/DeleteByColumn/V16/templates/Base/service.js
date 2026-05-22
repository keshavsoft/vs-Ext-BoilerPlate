import { kschema } from "@keshavsoft/kschema";

const deleteByColumn = ({ inRequestBody, inTableName }) => {
    const tableName = inTableName;

    return kschema.table(tableName).mutate.deleteWhere(inRequestBody);
};

export { deleteByColumn };