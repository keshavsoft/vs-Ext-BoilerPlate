const buildImport = (inEndpoint) => {
    const localEndpoint = inEndpoint;

    const safeName = localEndpoint.replace(/[^a-zA-Z0-9]/g, "_");

    return `import { router as routerFrom${safeName} } from "./${localEndpoint}/routes.js";`;
};

export default buildImport;