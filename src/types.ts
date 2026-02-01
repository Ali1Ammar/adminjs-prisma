export interface PrismaField {
  name: string;
  kind: 'scalar' | 'object' | 'enum';
  type: string;
  isList: boolean;
  isRequired: boolean;
  isId: boolean;
  isUnique: boolean;
  isReadOnly: boolean;
  isUpdatedAt: boolean;
  hasDefaultValue: boolean;
  relationName?: string | null;
  relationFromFields?: readonly string[];
  relationToFields?: readonly string[];
}

export interface PrismaModel {
  name: string;
  idFields: readonly string[];
  fields: readonly PrismaField[];
  [key: string]: any;
}

export interface PrismaMetadata {
  models: Record<string, PrismaModel>;
  enums: Record<string, any>;
}

export type ModelManager = Record<string, (...args: any[]) => Promise<any>>;

export type Enums = Record<string, any>;
