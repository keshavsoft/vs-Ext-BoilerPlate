const buildImport = (inEndpoint) => {
    const localEndpoint = inEndpoint;

    const safeName = localEndpoint
        .replace(/[^a-zA-Z0-9]/g, "_");

    const camelName =
        safeName.charAt(0).toLowerCase() + safeName.slice(1);

    return `import { ${camelName}Func } from "./${localEndpoint}/controller.js";`;
};

export default buildImport;