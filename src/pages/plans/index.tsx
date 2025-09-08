import { useState } from 'react'
import { AddPlanModal } from '@/features/plan/'
import { Button } from '@/shared/ui'
import { PlanList } from '@/entities/plan'
import { useUserStore } from '@/entities/user'

export const Plans = () => {
  const { currentUser } = useUserStore()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const handleAddPlanModalToggle = () => setIsAddModalOpen(prev => !prev)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Plans</h1>
        <Button onClick={handleAddPlanModalToggle}>Add New Plan</Button>
      </div>
      <AddPlanModal isOpen={isAddModalOpen} onClose={handleAddPlanModalToggle} />
      <PlanList currentUserId={currentUser?.id || ''} />
    </div>
  )
}
