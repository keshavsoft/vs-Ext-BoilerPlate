import { kschema } from "@keshavsoft/kschema";

const deleteItem = ({ inPk, inTableName, inRequestBody }) => {
    const tableName = inTableName;
    let LocalPk = parseInt(inPk);

    return kschema.table(tableName).mutate.updateWithChecks(LocalPk, inRequestBody);

};

export { deleteItem };