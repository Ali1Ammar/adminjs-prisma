export const getModelByName = (name, models) => {
    const model = models?.[name];
    if (!model) {
        throw new Error(`Could not find model: "${name}" in Prisma Metadata!`);
    }
    return model;
};
//# sourceMappingURL=get-model-by-name.js.map