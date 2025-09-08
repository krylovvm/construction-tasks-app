import { v4 as uuidv4 } from 'uuid'
import { getPlanDB } from '../model/db'
import { Plan } from '../model/types'

export const getUserPlans: (userId: string) => Promise<Plan[]> = async (
  userId: string
): Promise<Plan[]> => {
  const db = await getPlanDB()
  const docs = await db.plans.find({ selector: { userId } }).exec()

  return docs.map(doc => doc.toJSON())
}

export const getPlan = async (id: string): Promise<Plan | null> => {
  const db = await getPlanDB()
  const doc = await db.plans.findOne({ selector: { id } }).exec()

  return doc ? doc.toJSON() : null
}

export const addPlan = async (userId: string, name: string, image: string): Promise<Plan> => {
  const db = await getPlanDB()
  const now = Date.now()
  const plan: Plan = { id: uuidv4(), userId, name, image, createdAt: now, updatedAt: now }
  await db.plans.insert(plan)

  return plan
}

export const updatePlan = async (
  id: string,
  updates: Partial<Omit<Plan, 'id' | 'userId' | 'createdAt'>>
): Promise<Plan | null> => {
  const db = await getPlanDB()
  const doc = await db.plans.findOne({ selector: { id } }).exec()

  if (!doc) return null

  const updated = { ...doc.toJSON(), ...updates, updatedAt: Date.now() }

  await doc.update({ $set: updated })

  return updated
}

export const deletePlan = async (id: string): Promise<boolean> => {
  const db = await getPlanDB()
  const doc = await db.plans.findOne({ selector: { id } }).exec()

  if (!doc) return false

  await doc.remove()

  return true
}
