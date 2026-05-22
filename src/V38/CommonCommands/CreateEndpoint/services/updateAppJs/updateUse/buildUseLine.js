const buildUseLine = (inEndpoint) => {
    const localEndpoint = inEndpoint;

    const safeName = localEndpoint.replace(/[^a-zA-Z0-9]/g, "_");

    return `app.use("/${localEndpoint}", routerFrom${safeName});`;
};

export default buildUseLine;