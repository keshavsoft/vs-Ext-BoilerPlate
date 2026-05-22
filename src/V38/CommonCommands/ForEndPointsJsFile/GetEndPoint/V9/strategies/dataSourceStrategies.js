// strategies/dataSourceStrategies.js
export const DATA_SOURCE_STRATEGIES = [
    {
        id: "ENV_FILE",
        label: "Use table name from env file",
    },
    { id: "HARD_CODED_TABLE", label: "Use hardcoded table" },
    { id: "TABLE_PATH", label: "full table path" },
    { id: "TABLE_ROW_FIND", label: "TableName.Find" },
    { id: "TABLE_ROW_FILTER", label: "TableName.Filter" },
    { id: "TABLE_SHOWALL", label: "TableName.ShowAll" },
    {
        id: "REQUEST_PARAM",
        label: "Get table from request params",
    },
    {
        id: "JSON_CONFIG",
        label: "Load from JSON config",
    },
    {
        id: "AUTO_DETECT",
        label: "Auto detect from schema",
    }
];