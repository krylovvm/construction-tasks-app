import { create } from 'zustand'
import { getUserPlans, addPlan, deletePlan } from '../api/planApi'
import { Plan } from './types'

interface PlanState {
  plans: Plan[]
  activePlanId: string | null
  isLoading: boolean
  error: string | null
  fetchPlans: (userId: string) => Promise<void>
  addPlan: (userId: string, name: string, image: string) => Promise<Plan>
  deletePlan: (id: string) => Promise<boolean>
  setActivePlan: (id: string | null) => void
  getActivePlan: () => Plan | null
}

export const usePlanStore = create<PlanState>((set, get) => ({
  plans: [],
  activePlanId: null,
  isLoading: false,
  error: null,
  fetchPlans: async userId => {
    set({ isLoading: true, error: null })

    try {
      const plans = await getUserPlans(userId)

      set({ plans, isLoading: false })

      if (plans.length && !get().activePlanId && plans[0]) {
        set({ activePlanId: plans[0].id })
      }
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
    }
  },
  addPlan: async (userId, name, image) => {
    set({ isLoading: true, error: null })
    try {
      const plan = await addPlan(userId, name, image)
      set(state => ({ plans: [...state.plans, plan], isLoading: false }))
      return plan
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
      throw err
    }
  },
  deletePlan: async id => {
    set({ isLoading: true, error: null })
    try {
      const success = await deletePlan(id)
      if (success) {
        set(state => ({
          plans: state.plans.filter(p => p.id !== id),
          activePlanId: state.activePlanId === id ? null : state.activePlanId,
          isLoading: false,
        }))
      } else {
        set({ isLoading: false })
      }
      return success
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false })
      throw err
    }
  },
  setActivePlan: id => set({ activePlanId: id }),
  getActivePlan: () => {
    const { plans, activePlanId } = get()
    return plans.find(p => p.id === activePlanId) || null
  },
}))
