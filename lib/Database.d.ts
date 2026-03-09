import { BaseDatabase } from 'adminjs';
import { Resource } from './Resource.js';
import { PrismaMetadata } from './types.js';
export declare class Database extends BaseDatabase {
    protected client: any;
    protected metadata: PrismaMetadata;
    constructor(args: {
        client: any;
        dmmf: PrismaMetadata;
    });
    resources(): Array<Resource>;
    static isAdapterFor(args: {
        client?: any;
        dmmf?: PrismaMetadata;
    }): boolean;
}
