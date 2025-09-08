import { v4 as uuidv4 } from 'uuid'
import { getUserDB } from '../model/db'
import { User } from '../model/types'

export const findUserByName = async (name: string): Promise<User | null> => {
  const db = await getUserDB()
  const doc = await db.users.findOne({ selector: { name } }).exec()

  return doc ? doc.toJSON() : null
}

export const createUser = async (name: string): Promise<User> => {
  const db = await getUserDB()
  const now = Date.now()
  const user: User = { id: uuidv4(), name, createdAt: now }

  await db.users.insert(user)

  return user
}
