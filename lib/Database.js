/* eslint-disable class-methods-use-this */
import { BaseDatabase } from 'adminjs';
import { Resource } from './Resource.js';
export class Database extends BaseDatabase {
    client;
    metadata;
    constructor(args) {
        super(args);
        const { client, dmmf } = args;
        this.client = client;
        this.metadata = dmmf;
    }
    resources() {
        if (!this.metadata?.models)
            return [];
        const resources = [];
        // eslint-disable-next-line no-restricted-syntax
        for (const model of Object.values(this.metadata.models)) {
            const resource = new Resource({
                model,
                client: this.client,
                enums: this.metadata.enums ?? {},
            });
            resources.push(resource);
        }
        return resources;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static isAdapterFor(args) {
        const { dmmf } = args;
        return !!dmmf?.models;
    }
}
//# sourceMappingURL=Database.js.map