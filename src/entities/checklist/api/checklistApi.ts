import { nanoid } from 'nanoid'
import { Checklist, ChecklistItem } from '../model/types'
import { getChecklistDb } from '../model/db'

const DEFAULT_CHECKLIST_ITEMS = Array.from({ length: 3 }, (_, i) => ({
  id: nanoid(),
  text: `Check item ${i + 1}`,
  status: 'Not started' as const,
}))

export const listChecklistsByTask = async (taskId: string): Promise<Checklist[]> => {
  const db = await getChecklistDb()
  const docs = await db.checklists.find({ selector: { taskId } }).exec()

  return docs.map(doc => {
    const plain = doc.toJSON() as Checklist
    return {
      ...plain,
      items: [...plain.items],
    }
  })
}

export const addChecklist = async (taskId: string, title: string): Promise<Checklist> => {
  const db = await getChecklistDb()
  const now = Date.now()
  const checklist: Checklist = {
    id: nanoid(),
    taskId,
    title,
    items: DEFAULT_CHECKLIST_ITEMS,
    createdAt: now,
    updatedAt: now,
  }
  const doc = await db.checklists.insert(checklist)
  const plain = doc.toJSON() as Checklist

  return {
    ...plain,
    items: [...plain.items],
  }
}

export const updateChecklist = async (checklist: Checklist): Promise<void> => {
  const db = await getChecklistDb()
  const doc = await db.checklists.findOne(checklist.id).exec()
  if (!doc) return

  await doc.modify(data => ({
    ...data,
    title: checklist.title,
    updatedAt: Date.now(),
  }))
}

export const deleteChecklist = async (id: string): Promise<void> => {
  const db = await getChecklistDb()
  const doc = await db.checklists.findOne(id).exec()
  if (!doc) return

  await doc.remove()
}

// Checklist Item CRUD
export const addChecklistItem = async (
  checklistId: string,
  text: string,
  status: ChecklistItem['status'] = 'Not started'
): Promise<ChecklistItem | undefined> => {
  const db = await getChecklistDb()
  const doc = await db.checklists.findOne(checklistId).exec()
  if (!doc) return

  const item: ChecklistItem = { id: nanoid(), text, status }

  await doc.modify(data => ({
    ...data,
    items: [...data.items, item],
    updatedAt: Date.now(),
  }))

  return item
}

export const updateChecklistItem = async (
  checklistId: string,
  item: ChecklistItem
): Promise<void> => {
  const db = await getChecklistDb()
  const doc = await db.checklists.findOne(checklistId).exec()
  if (!doc) return

  await doc.modify(data => {
    const items = data.items.map((i: ChecklistItem) => (i.id === item.id ? item : i))
    return {
      ...data,
      items,
      updatedAt: Date.now(),
    }
  })
}

export const deleteChecklistItem = async (checklistId: string, itemId: string): Promise<void> => {
  const db = await getChecklistDb()
  const doc = await db.checklists.findOne(checklistId).exec()
  if (!doc) return

  await doc.modify(data => ({
    ...data,
    items: data.items.filter((i: ChecklistItem) => i.id !== itemId),
    updatedAt: Date.now(),
  }))
}
