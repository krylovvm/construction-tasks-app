import { useState } from 'react'
import { usePlanStore } from '@/entities/plan'
import { Button, Modal } from '@/shared/ui'

interface DeletePlanModalProps {
  isOpen: boolean
  onClose: () => void
  onDelete: () => void
  planId: string
}

export const DeletePlanModal = ({ isOpen, planId, onClose, onDelete }: DeletePlanModalProps) => {
  const { deletePlan } = usePlanStore()
  const [isLoading, setLoading] = useState(false)

  const handleConfirm = async () => {
    if (!planId) return

    setLoading(true)
    await deletePlan(planId)
    setLoading(false)
    onClose()
    onDelete()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Plan">
      <p className="mb-4 text-gray-700">Are you sure you want to delete this plan?</p>

      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} disabled={isLoading}>
          {isLoading ? 'Deleting...' : 'Confirm'}
        </Button>
      </div>
    </Modal>
  )
}
