#!/usr/bin/env node
import pkg from '@prisma/generator-helper';
const { generatorHandler } = pkg;
import type { GeneratorOptions } from '@prisma/generator-helper';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const serializeField = (field: any) => ({
    name: field.name,
    kind: field.kind,
    type: field.type,
    isList: field.isList,
    isRequired: field.isRequired,
    isId: field.isId ?? false,
    isUnique: field.isUnique ?? false,
    isReadOnly: field.isReadOnly ?? false,
    isUpdatedAt: field.isUpdatedAt ?? false,
    hasDefaultValue: field.hasDefaultValue ?? false,
});

const serializeRelation = (field: any) => ({
    ...serializeField(field),
    relationName: field.relationName ?? null,
    relationFromFields: field.relationFromFields ?? [],
    relationToFields: field.relationToFields ?? [],
});

generatorHandler({
    onManifest() {
        return {
            prettyName: 'AdminJS Prisma Metadata Generator',
            defaultOutput: '../generated/adminjs-prisma',
        };
    },
    async onGenerate(options: GeneratorOptions) {
        const models: Record<string, any> = {};

        // eslint-disable-next-line no-restricted-syntax
        for (const model of options.dmmf.datamodel.models) {
            const scalars = model.fields.filter((f) => f.kind === 'scalar');
            const relations = model.fields.filter((f) => f.kind === 'object');
            const enums = model.fields.filter((f) => f.kind === 'enum');

            models[model.name] = {
                name: model.name,
                idFields: scalars.filter((f) => f.isId).map((f) => f.name),
                scalars: scalars.map(serializeField),
                relations: relations.map(serializeRelation),
                enums: enums.map(serializeField),
                allFields: model.fields.map(serializeField),
                fields: model.fields.map(serializeField), // Keeping 'fields' for compatibility if needed
            };
        }

        const enums = Object.fromEntries(
            options.dmmf.datamodel.enums.map((enm) => [enm.name, enm.values.map((v) => v.name)]),
        );

        const content = `export const prismaMetadata = ${JSON.stringify({ models, enums }, null, 2)} as const;\n`;

        const outputDir = options.generator.output?.value;
        if (!outputDir) throw new Error('No output directory defined for adminjs-prisma generator');

        mkdirSync(outputDir, { recursive: true });
        writeFileSync(join(outputDir, 'metadata.ts'), content);
    },
});
