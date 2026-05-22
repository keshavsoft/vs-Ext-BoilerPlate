import { kschema } from "@keshavsoft/kschema";

const deleteItem = ({ inPk, inTableName }) => {
    const tableName = inTableName;

    return kschema.table(tableName).deleteByPk(inPk);
};

export { deleteItem };