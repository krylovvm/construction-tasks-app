import { useState } from 'react'
import { usePlanStore } from '@/entities/plan'
import { useUserStore } from '@/entities/user'
import { Button, Input, ImageUpload, Modal } from '@/shared/ui'

interface AddPlanModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AddPlanModal = ({ isOpen, onClose }: AddPlanModalProps) => {
  const { currentUser } = useUserStore()
  const { addPlan } = usePlanStore()
  const [name, setName] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [isLoading, setLoading] = useState(false)

  if (!currentUser) return null

  const handleConfirm = async () => {
    if (!name || !image) return

    setLoading(true)

    await addPlan(currentUser.id, name, image)

    setName('')
    setImage(null)
    setLoading(false)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Plan">
      <div className="flex flex-col gap-3">
        <Input label="Plan Name" value={name} onChange={e => setName(e.target.value)} />
        <ImageUpload label="Plan Image" value={image} onChange={setImage} />
        <div className="flex justify-end gap-2 mt-3">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={isLoading || !name || !image}>
            {isLoading ? 'Adding...' : 'Confirm'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
