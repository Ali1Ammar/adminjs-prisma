import { BaseResource, Filter, BaseRecord } from 'adminjs';
import { Property } from './Property.js';
import { ModelManager, Enums, PrismaModel } from './types.js';
export declare class Resource extends BaseResource {
    protected client: any;
    protected model: PrismaModel;
    protected enums: Enums;
    protected manager: ModelManager;
    protected propertiesObject: Record<string, Property>;
    protected idProperty: Property;
    protected compositeKeyFields: readonly string[] | null;
    constructor(args: {
        model: PrismaModel;
        client: any;
        enums: Enums;
    });
    /**
     * Encodes composite key field values into a single string ID
     */
    protected encodeCompositeId(record: Record<string, any>): string;
    /**
     * Decodes a composite ID string back into individual field values
     */
    protected decodeCompositeId(id: string | number): Record<string, any>;
    /**
     * Builds the Prisma 'where' clause for composite primary keys
     */
    protected buildCompositeWhereClause(id: string | number): Record<string, any>;
    databaseName(): string;
    databaseType(): string;
    id(): string;
    properties(): Array<Property>;
    property(path: string): Property | null;
    build(params: Record<string, any>): BaseRecord;
    count(filter: Filter): Promise<number>;
    find(filter: Filter, params?: {
        limit?: number;
        offset?: number;
        sort?: {
            sortBy?: string;
            direction?: 'asc' | 'desc';
        };
    }): Promise<Array<BaseRecord>>;
    protected prepareReturnValuesWithCompositeId(result: Record<string, any>): Record<string, any>;
    protected buildSortBy(sort?: {
        sortBy?: string;
        direction?: 'asc' | 'desc';
    }): {
        [x: string]: {
            [x: string]: "asc" | "desc";
        };
    } | {
        [x: string]: "asc" | "desc";
    };
    findOne(id: string | number): Promise<BaseRecord | null>;
    findMany(ids: Array<string | number>): Promise<Array<BaseRecord>>;
    create(params: Record<string, any>): Promise<Record<string, any>>;
    update(pk: string | number, params?: Record<string, any>): Promise<Record<string, any>>;
    delete(id: string | number): Promise<void>;
    static isAdapterFor(args: {
        model: PrismaModel;
        client: any;
    }): boolean;
    protected prepareProperties(): {
        [propertyPath: string]: Property;
    };
    protected prepareParams(params: Record<string, any>): Record<string, any>;
    protected prepareReturnValues(params: Record<string, any>): Record<string, any>;
}
