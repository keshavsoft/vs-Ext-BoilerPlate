import { kschema } from "@keshavsoft/kschema";

const deleteItem = ({ inPk, inTableName }) => {
    const tableName = inTableName;
    let LocalPk = parseInt(inPk);

    return kschema.table(tableName).mutate.deleteWithChecks(LocalPk);
};

export { deleteItem };