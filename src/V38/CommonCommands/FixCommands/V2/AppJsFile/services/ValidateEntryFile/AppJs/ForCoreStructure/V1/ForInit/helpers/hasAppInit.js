export function hasAppInit(ast, config) {
    const { variableName, initCode } = config;

    return ast.program.body.some(node =>
        node.type === 'VariableDeclaration' &&
        node.declarations.some(d =>
            d.id?.name === variableName &&
            d.init?.callee?.name === initCode
        )
    );
};