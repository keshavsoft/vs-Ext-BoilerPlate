import { kschema } from "@keshavsoft/kschema";

const filterItems = ({ inPk, inTableName }) => {
    const tableName = inTableName;

    return kschema.table(tableName).query.filterByPk(parseInt(inPk));
};

export { filterItems };