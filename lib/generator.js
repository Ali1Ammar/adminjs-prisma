#!/usr/bin/env node
import pkg from '@prisma/generator-helper';
const { generatorHandler } = pkg;
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
const serializeField = (field) => {
    const obj = {
        name: field.name,
        kind: field.kind,
        type: field.type,
        isList: field.isList,
        isRequired: field.isRequired,
    };
    if (field.isId)
        obj.isId = true;
    if (field.isUnique)
        obj.isUnique = true;
    if (field.isReadOnly)
        obj.isReadOnly = true;
    if (field.isUpdatedAt)
        obj.isUpdatedAt = true;
    if (field.hasDefaultValue)
        obj.hasDefaultValue = true;
    return obj;
};
const serializeRelation = (field) => {
    const obj = serializeField(field);
    if (field.relationName)
        obj.relationName = field.relationName;
    if (field.relationFromFields?.length)
        obj.relationFromFields = field.relationFromFields;
    if (field.relationToFields?.length)
        obj.relationToFields = field.relationToFields;
    return obj;
};
generatorHandler({
    onManifest() {
        return {
            prettyName: 'AdminJS Prisma Metadata Generator',
            defaultOutput: '../generated/adminjs',
        };
    },
    async onGenerate(options) {
        const models = {};
        // eslint-disable-next-line no-restricted-syntax
        for (const model of options.dmmf.datamodel.models) {
            const prismaModel = {
                name: model.name,
                fields: model.fields.map((f) => {
                    if (f.kind === 'object')
                        return serializeRelation(f);
                    return serializeField(f);
                }),
            };
            // Add composite primary key if present (@@id([...]))
            if (model.primaryKey?.fields?.length) {
                prismaModel.primaryKey = {
                    name: model.primaryKey.name ?? null,
                    fields: model.primaryKey.fields,
                };
            }
            models[model.name] = prismaModel;
        }
        const enums = Object.fromEntries(options.dmmf.datamodel.enums.map((enm) => [enm.name, enm.values.map((v) => v.name)]));
        const content = `export const prismaMetadata = ${JSON.stringify({ models, enums }, null, 2)} as const;\n`;
        const outputDir = options.generator.output?.value;
        if (!outputDir)
            throw new Error('No output directory defined for adminjs-prisma generator');
        mkdirSync(outputDir, { recursive: true });
        writeFileSync(join(outputDir, 'metadata.ts'), content);
    },
});
//# sourceMappingURL=generator.js.map