const buildUseLine = (inEndpoint) => {
    const localEndpoint = inEndpoint;

    const safeName = localEndpoint.replace(/[^a-zA-Z0-9]/g, "_");

    const camelName =
        safeName.charAt(0).toLowerCase() + safeName.slice(1);

    return `router.delete('/${localEndpoint}', express.json(), (req, res) => ${camelName}Func({ req, res, inTableName: tableName }));`
};

export default buildUseLine;