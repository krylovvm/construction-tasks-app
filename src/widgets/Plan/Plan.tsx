import { usePlanStore } from '@/entities/plan'
import { useTaskStore } from '@/entities/task'
import { PlanView } from './PlanView'

export const Plan = () => {
  const { getActivePlan, activePlanId } = usePlanStore()
  const { activeTaskId, setActiveTask } = useTaskStore()
  const plan = getActivePlan()

  if (!plan) return null

  return (
    <PlanView
      planImage={plan.image}
      planId={plan.id}
      activeTaskId={activeTaskId || ''}
      onTaskSelect={setActiveTask}
    />
  )
}
