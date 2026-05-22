export function hasAppInit(ast, config) {
    const { variableName } = config;

    return ast.program.body.some(node =>
        node.type === 'VariableDeclaration' &&
        node.declarations.some(d =>
            d.id?.name === variableName &&
            d.init?.type === 'CallExpression' &&
            d.init.callee?.type === 'Identifier' &&
            d.init.callee.name === 'express'
        )
    );
};