export function buildFix(target) {
    return `
${target}.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port', process.env.PORT || 3000);
});
`;
}