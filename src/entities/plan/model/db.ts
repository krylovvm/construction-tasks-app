import { createRxDatabase, addRxPlugin, RxDatabase, RxCollection } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { planSchema, PlanDocType } from './schema';

addRxPlugin(RxDBQueryBuilderPlugin);

export type PlanCollection = RxCollection<PlanDocType>;
export type PlanDatabase = RxDatabase<{ plans: PlanCollection }>;

let dbPromise: Promise<PlanDatabase> | null = null;

export const getPlanDB = async (): Promise<PlanDatabase> => {
  if (dbPromise) return dbPromise;
  dbPromise = createRxDatabase<{ plans: PlanCollection }>({
    name: 'plansdb',
    storage: getRxStorageDexie(),
  }).then(async db => {
    await db.addCollections({ plans: { schema: planSchema } });
    return db as PlanDatabase;
  });
  return dbPromise;
};
