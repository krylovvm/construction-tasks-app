import { toTypedRxJsonSchema } from 'rxdb';
import { User } from './types';

const userSchemaLiteral = {
  title: 'user schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    name: { type: 'string', maxLength: 100 },
    createdAt: { type: 'number' },
  },
  required: ['id', 'name', 'createdAt'],
  indexes: ['name'],
};

export const userSchema = toTypedRxJsonSchema(userSchemaLiteral);
export type UserDocType = User;
