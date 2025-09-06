import { toTypedRxJsonSchema } from 'rxdb';
import { Plan } from './types';

const planSchemaLiteral = {
  title: 'plan schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    userId: { type: 'string', maxLength: 100 },
    name: { type: 'string', maxLength: 100 },
    image: { type: 'string' }, // base64
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' },
  },
  required: ['id', 'userId', 'name', 'image', 'createdAt', 'updatedAt'],
  indexes: ['userId'],
};

export const planSchema = toTypedRxJsonSchema(planSchemaLiteral);
export type PlanDocType = Plan;
