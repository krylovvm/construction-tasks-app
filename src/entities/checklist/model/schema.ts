import { RxJsonSchema } from 'rxdb'
import { Checklist } from './types'

export const checklistSchema: RxJsonSchema<Checklist> = {
  title: 'checklist schema',
  version: 0,
  description: 'Checklist for tasks',
  type: 'object',
  primaryKey: 'id',
  properties: {
    id: { type: 'string', maxLength: 100 },
    taskId: { type: 'string', maxLength: 100 },
    title: { type: 'string', maxLength: 100 },
    items: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', maxLength: 100 },
          text: { type: 'string', maxLength: 200 },
          status: {
            type: 'string',
            enum: ['Not started', 'In progress', 'Blocked', 'Final Check awaiting', 'Done'],
          },
        },
        required: ['id', 'text', 'status'],
      },
    },
    createdAt: { type: 'number' },
    updatedAt: { type: 'number' },
  },
  required: ['id', 'taskId', 'title', 'items', 'createdAt', 'updatedAt'],
  indexes: ['taskId'],
}
