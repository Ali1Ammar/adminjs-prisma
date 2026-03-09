import { Filter } from 'adminjs';
import { Property } from '../Property.js';
import { PrismaField } from '../types.js';
export declare const convertParam: (property: Property, fields: readonly PrismaField[], value: string | boolean | number | Record<string, any> | null | undefined) => string | boolean | number | Record<string, any> | null | undefined;
export declare const convertFilter: (modelFields: readonly PrismaField[], filterObject?: Filter) => Record<string, any>;
