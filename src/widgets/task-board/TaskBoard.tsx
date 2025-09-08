import { usePlanStore } from '@/entities/plan'
import { TaskList } from '@/entities/task'

export const TaskBoard = () => {
  const { activePlanId } = usePlanStore()
  if (!activePlanId) return null

  return <TaskList planId={activePlanId} />
}
