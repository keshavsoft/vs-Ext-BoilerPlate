export function startFunc(body) {
    const lastNode = body[body.length - 1];

    const isLast =
        lastNode.type === 'ExportNamedDeclaration' ||
        lastNode.type === 'ExportDefaultDeclaration';

    return {
        success: isLast,
        message: isLast
            ? 'Export is last statement'
            : 'Export is NOT last statement'
    };
};