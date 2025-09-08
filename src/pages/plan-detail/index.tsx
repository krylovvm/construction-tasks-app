import { PlanContainer } from '@/widgets/'
import { Button } from '@/shared/ui'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { DeletePlanModal } from '@/features/plan/'
import { useState } from 'react'
import { PATHS } from '@/shared/config'
import { usePlanStore } from '@/entities/plan'
import { useUserStore } from '@/entities/user'
import { useEffect } from 'react'
import { TaskList } from '@/entities/task'

export const PlanDetail = () => {
  const { id: planId } = useParams<{ id: string }>()
  const { fetchPlans, plans } = usePlanStore()

  const { currentUser } = useUserStore()

  useEffect(() => {
    if (currentUser?.id) {
      fetchPlans(currentUser.id)
    }
  }, [currentUser?.id, fetchPlans])

  const currentPlan = plans.find(p => p.id === planId)

  const navigate = useNavigate()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleDeletePlanModalToggle = () => setIsDeleteModalOpen(prev => !prev)
  const handleNavigateToPlans = () => navigate(PATHS.PLANS)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <Link to={PATHS.PLANS} className="text-2xl font-bold hover:underline">
            Plans
          </Link>
          <span className="text-2xl font-bold">{'>'}</span>
          <h1 className="text-2xl font-bold">{currentPlan?.name}</h1>
        </div>
        <Button onClick={handleDeletePlanModalToggle}>Delete Plan</Button>
      </div>
      {planId && currentPlan && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-4">
            <PlanContainer plan={currentPlan} />
            <TaskList planId={planId} />
          </div>

          <DeletePlanModal
            isOpen={isDeleteModalOpen}
            onClose={handleDeletePlanModalToggle}
            onDelete={handleNavigateToPlans}
            planId={planId}
          />
        </>
      )}
    </div>
  )
}
