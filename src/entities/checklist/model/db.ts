import { createRxDatabase, addRxPlugin, RxDatabase, RxCollection } from 'rxdb'
import { checklistSchema } from './schema'
import { Checklist } from './types'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'

addRxPlugin(RxDBQueryBuilderPlugin)

export type ChecklistCollection = RxCollection<Checklist>
export type ChecklistDatabase = RxDatabase<{ checklists: ChecklistCollection }>

let dbPromise: Promise<ChecklistDatabase> | null = null

export const getChecklistDb = async (): Promise<ChecklistDatabase> => {
  if (dbPromise) return dbPromise
  dbPromise = createRxDatabase<{ checklists: ChecklistCollection }>({
    name: 'checklistsdb',
    storage: getRxStorageDexie(),
  }).then(async db => {
    await db.addCollections({ checklists: { schema: checklistSchema } })
    return db as ChecklistDatabase
  })
  return dbPromise
}
