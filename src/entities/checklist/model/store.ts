import { create } from 'zustand'
import { Checklist, ChecklistItem, ChecklistItemStatus } from './types'
import {
  listChecklistsByTask,
  addChecklist,
  updateChecklist,
  deleteChecklist,
  addChecklistItem,
  updateChecklistItem,
  deleteChecklistItem,
} from '../api/checklistApi'

interface ChecklistState {
  checklists: Checklist[]
  isLoading: boolean
  error: string | null
  fetchChecklists: (taskId: string) => Promise<void>
  addChecklist: (taskId: string, title: string) => Promise<void>
  updateChecklist: (checklist: Checklist) => Promise<void>
  deleteChecklist: (id: string) => Promise<void>
  addChecklistItem: (
    checklistId: string,
    text: string,
    status?: ChecklistItemStatus
  ) => Promise<void>
  updateChecklistItem: (checklistId: string, item: ChecklistItem) => Promise<void>
  deleteChecklistItem: (checklistId: string, itemId: string) => Promise<void>
}

export const useChecklistStore = create<ChecklistState>((set, get) => ({
  checklists: [],
  isLoading: false,
  error: null,
  fetchChecklists: async taskId => {
    set({ isLoading: true, error: null })
    try {
      const checklists = await listChecklistsByTask(taskId)
      set({ checklists, isLoading: false })
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  addChecklist: async (taskId, title) => {
    set({ isLoading: true, error: null })
    try {
      await addChecklist(taskId, title)
      await get().fetchChecklists(taskId)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  updateChecklist: async checklist => {
    set({ isLoading: true, error: null })
    try {
      await updateChecklist(checklist)
      await get().fetchChecklists(checklist.taskId)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  deleteChecklist: async id => {
    set({ isLoading: true, error: null })
    try {
      const checklist = get().checklists.find(c => c.id === id)
      if (checklist) {
        await deleteChecklist(id)
        await get().fetchChecklists(checklist.taskId)
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  addChecklistItem: async (checklistId, text, status = 'Not started') => {
    set({ isLoading: true, error: null })
    try {
      const checklist = get().checklists.find(c => c.id === checklistId)
      if (checklist) {
        await addChecklistItem(checklistId, text, status)
        await get().fetchChecklists(checklist.taskId)
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  updateChecklistItem: async (checklistId, item) => {
    set({ isLoading: true, error: null })
    try {
      const checklist = get().checklists.find(c => c.id === checklistId)
      if (checklist) {
        await updateChecklistItem(checklistId, item)
        await get().fetchChecklists(checklist.taskId)
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  deleteChecklistItem: async (checklistId, itemId) => {
    set({ isLoading: true, error: null })
    try {
      const checklist = get().checklists.find(c => c.id === checklistId)
      if (checklist) {
        await deleteChecklistItem(checklistId, itemId)
        await get().fetchChecklists(checklist.taskId)
      }
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
}))
