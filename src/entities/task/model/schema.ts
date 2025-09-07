import { toTypedRxJsonSchema } from 'rxdb'
import { Task } from './types'

const taskSchemaLiteral = {
  title: 'task schema',
  version: 0,
  primaryKey: 'id',
  type: 'object',
  properties: {
    id: { type: 'string', maxLength: 100 },
    planId: { type: 'string', maxLength: 100 },
    title: { type: 'string', maxLength: 100 },
    status: { type: 'string', enum: ['new', 'in-progress', 'done'] },
    x: { type: 'number' },
    y: { type: 'number' },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' },
  },
  required: ['id', 'planId', 'title', 'status', 'x', 'y', 'createdAt', 'updatedAt'],
  indexes: ['planId'],
}

export const taskSchema = toTypedRxJsonSchema<typeof taskSchemaLiteral>(taskSchemaLiteral)
export type TaskDocType = Task
