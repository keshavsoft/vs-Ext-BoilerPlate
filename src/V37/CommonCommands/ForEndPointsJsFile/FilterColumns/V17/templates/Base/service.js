import { kschema } from "@keshavsoft/kschema";

const filterItems = ({ inRequestQuery, inTableName }) => {
    const tableName = inTableName;

    return kschema.table(tableName).query.filterByColumns(inRequestQuery);
};

export { filterItems };