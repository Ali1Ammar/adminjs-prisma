import { BaseProperty, PropertyType } from 'adminjs';
import { Enums, PrismaField } from './types.js';
export declare class Property extends BaseProperty {
    column: PrismaField;
    protected enums: Enums;
    protected columnPosition: number;
    constructor(column: PrismaField, columnPosition: number | undefined, enums: Enums);
    isEditable(): boolean;
    isId(): boolean;
    name(): string;
    isRequired(): boolean;
    isSortable(): boolean;
    reference(): string | null;
    referencedColumnName(): string | null;
    foreignColumnName(): string | null;
    availableValues(): Array<string> | null;
    position(): number;
    isEnum(): boolean;
    isArray(): boolean;
    type(): PropertyType;
}
