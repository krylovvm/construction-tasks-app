import { nanoid } from 'nanoid'
import { Checklist, ChecklistItem } from '../model/types'
import { getChecklistDb } from '../model/db'

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
    items: [],
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

  await doc.update({
    $set: {
      title: checklist.title,
      updatedAt: Date.now(),
    },
  })
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

  await doc.update({
    $set: {
      items: [...doc.items, item],
      updatedAt: Date.now(),
    },
  })

  return item
}

export const updateChecklistItem = async (
  checklistId: string,
  item: ChecklistItem
): Promise<void> => {
  const db = await getChecklistDb()
  const doc = await db.checklists.findOne(checklistId).exec()
  if (!doc) return

  const items = doc.items.map((i: ChecklistItem) => (i.id === item.id ? item : i))
  await doc.update({
    $set: {
      items,
      updatedAt: Date.now(),
    },
  })
}

export const deleteChecklistItem = async (checklistId: string, itemId: string): Promise<void> => {
  const db = await getChecklistDb()
  const doc = await db.checklists.findOne(checklistId).exec()
  if (!doc) return

  const items = doc.items.filter((i: ChecklistItem) => i.id !== itemId)
  await doc.update({
    $set: {
      items,
      updatedAt: Date.now(),
    },
  })
}
