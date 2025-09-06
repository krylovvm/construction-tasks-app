import { createRxDatabase, addRxPlugin, RxDatabase, RxCollection } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { userSchema, UserDocType } from './schema';

addRxPlugin(RxDBQueryBuilderPlugin);

export type UserCollection = RxCollection<UserDocType>;
export type UserDatabase = RxDatabase<{ users: UserCollection }>;

let dbPromise: Promise<UserDatabase> | null = null;

export const getUserDB = async (): Promise<UserDatabase> => {
  if (dbPromise) return dbPromise;

  dbPromise = createRxDatabase<{ users: UserCollection }>({
    name: 'usersdb',
    storage: getRxStorageDexie(),
  }).then(async db => {
    await db.addCollections({ users: { schema: userSchema } });
    return db as UserDatabase;
  });

  return dbPromise;
};
