import { createRxDatabase, addRxPlugin, RxDatabase, RxCollection } from 'rxdb'
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie'
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder'
import { taskSchema, TaskDocType } from './schema'

addRxPlugin(RxDBQueryBuilderPlugin)

export type TaskCollection = RxCollection<TaskDocType>
export type TaskDatabase = RxDatabase<{ tasks: TaskCollection }>

let dbPromise: Promise<TaskDatabase> | null = null

export const getTaskDB = async (): Promise<TaskDatabase> => {
  if (dbPromise) return dbPromise
  dbPromise = createRxDatabase<{ tasks: TaskCollection }>({
    name: 'tasksdb',
    storage: getRxStorageDexie(),
  }).then(async db => {
    await db.addCollections({ tasks: { schema: taskSchema } })
    return db as TaskDatabase
  })
  return dbPromise
}
