import { v4 as uuidv4 } from 'uuid'
import { getTaskDB } from '../model/db'
import { Task } from '../model/types'

export const getPlanTasks = async (planId: string): Promise<Task[]> => {
  const db = await getTaskDB()
  const docs = await db.tasks.find({ selector: { planId } }).exec()
  return docs.map(doc => doc.toJSON())
}

export const addTask = async (
  task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Task> => {
  const db = await getTaskDB()
  const now = Date.now()
  const newTask: Task = { ...task, id: uuidv4(), createdAt: now, updatedAt: now }
  await db.tasks.insert(newTask)
  return newTask
}

export const updateTask = async (
  id: string,
  updates: Partial<Omit<Task, 'id' | 'planId' | 'createdAt'>>
): Promise<void> => {
  const db = await getTaskDB()
  const doc = await db.tasks.findOne({ selector: { id } }).exec()

  if (!doc) return

  await doc.modify(data => ({
    ...data,
    ...updates,
    updatedAt: Date.now(),
  }))
}

export const deleteTask = async (id: string): Promise<boolean> => {
  const db = await getTaskDB()
  const doc = await db.tasks.findOne({ selector: { id } }).exec()
  if (!doc) return false
  await doc.remove()
  return true
}
