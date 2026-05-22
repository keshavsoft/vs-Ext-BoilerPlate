import { kschema } from "@keshavsoft/kschema";

const deleteByColumn = ({ inQuery, inTableName }) => {
    const tableName = inTableName;

    return kschema.table(tableName).deleteByColumns(inQuery);
};

export { deleteByColumn };