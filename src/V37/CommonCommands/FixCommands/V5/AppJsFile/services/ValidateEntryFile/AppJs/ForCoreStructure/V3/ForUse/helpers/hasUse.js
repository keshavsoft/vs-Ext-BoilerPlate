export function hasUseCheck({ ast }) {
    let hasUse = false;

    ast.program.body.forEach(node => {
        if (node.type === 'ExpressionStatement') {
            const expr = node.expression;

            if (
                expr.type === 'CallExpression' &&
                expr.callee?.type === 'MemberExpression' &&
                expr.callee.property?.name === 'use' &&
                expr.arguments?.some(arg =>
                    arg.type === 'CallExpression' &&
                    arg.callee?.object?.name === 'express'
                )
            ) {
                hasUse = true;
            };
        };
    });

    return hasUse;
};