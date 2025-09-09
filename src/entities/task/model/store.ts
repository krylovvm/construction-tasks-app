import { create } from 'zustand'
import {
  getPlanTasks,
  addTask as apiAddTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from '../api/taskApi'
import { Task } from './types'

interface TaskState {
  tasks: Task[]
  isLoading: boolean
  error: string | null
  activeTaskId: string | null
  fetchTasks: (planId: string) => Promise<void>
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Task>
  updateTask: (
    task: Task,
    updates: Partial<Omit<Task, 'id' | 'planId' | 'createdAt'>>
  ) => Promise<void>
  deleteTask: (id: string) => Promise<boolean>
  setActiveTask: (id: string | null) => void
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  activeTaskId: null,
  isLoading: false,
  error: null,
  fetchTasks: async planId => {
    const tasks = await getPlanTasks(planId)
    set({ tasks })
  },
  addTask: async task => {
    const newTask = await apiAddTask(task)
    set(state => ({ tasks: [...state.tasks, newTask] }))
    return newTask
  },
  updateTask: async (task, updates) => {
    set({ isLoading: true, error: null })
    try {
      await apiUpdateTask(task.id, updates)
      await get().fetchTasks(task.planId)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
  deleteTask: async id => {
    const success = await apiDeleteTask(id)
    if (success) {
      set(state => ({
        tasks: state.tasks.filter(t => t.id !== id),
        activeTaskId: get().activeTaskId === id ? null : get().activeTaskId,
      }))
    }
    return success
  },
  setActiveTask: id => set({ activeTaskId: id }),
}))
