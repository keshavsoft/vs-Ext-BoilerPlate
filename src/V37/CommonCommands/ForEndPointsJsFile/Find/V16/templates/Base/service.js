import { kschema } from "@keshavsoft/kschema";

const findItem = ({ inPk, inTableName }) => {
    const tableName = inTableName;

    // return kschema.table(tableName).findByPk(inPk);

    return kschema.table(tableName).query.findByPk(inPk);
};

export { findItem };