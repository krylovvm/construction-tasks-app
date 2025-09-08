import { FC, useEffect } from 'react'
import { usePlanStore } from '@/entities/plan'
import { PlanCard } from './PlanCard'

interface PlanListProps {
  currentUserId?: string
}

export const PlanList: FC<PlanListProps> = ({ currentUserId }) => {
  const { plans, fetchPlans, isLoading } = usePlanStore()

  useEffect(() => {
    if (currentUserId) fetchPlans(currentUserId)
  }, [currentUserId, fetchPlans])

  if (isLoading) {
    return <div className="p-8 text-center">Loading plans...</div>
  }

  if (plans.length === 0) {
    return <div className="p-8 text-center">No plans available. Please add a new plan.</div>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {plans.map(plan => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  )
}
