import { create } from 'zustand'
import {
  listTasksForPlan,
  addTask as apiAddTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
} from '../api/taskApi'
import { Task } from './types'

interface TaskState {
  tasks: Task[]
  activeTaskId: string | null
  fetchTasks: (planId: string) => Promise<void>
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Task>
  updateTask: (
    id: string,
    updates: Partial<Omit<Task, 'id' | 'planId' | 'createdAt'>>
  ) => Promise<Task | null>
  deleteTask: (id: string) => Promise<boolean>
  setActiveTask: (id: string | null) => void
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  activeTaskId: null,
  fetchTasks: async planId => {
    const tasks = await listTasksForPlan(planId)
    set({ tasks })
  },
  addTask: async task => {
    const newTask = await apiAddTask(task)
    set(state => ({ tasks: [...state.tasks, newTask] }))
    return newTask
  },
  updateTask: async (id, updates) => {
    const updated = await apiUpdateTask(id, updates)
    if (updated) {
      set(state => ({
        tasks: state.tasks.map(t => (t.id === id ? updated : t)),
      }))
    }
    return updated
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
