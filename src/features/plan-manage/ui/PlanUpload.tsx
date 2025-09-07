import { useState, FC } from 'react'
import { usePlanStore } from '@/entities/plan'
import { useUserStore } from '@/entities/user'
import { Button, Input, ImageUpload } from '@/shared/ui'

export const PlanUpload: FC = () => {
  const { currentUser } = useUserStore()
  const { addPlan } = usePlanStore()
  const [name, setName] = useState('')
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  if (!currentUser) return null

  const handleUpload = async () => {
    if (!name || !image) return
    setLoading(true)
    await addPlan(currentUser.id, name, image)
    setName('')
    setImage(null)
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-2 mb-4">
      <Input label="Plan Name" value={name} onChange={e => setName(e.target.value)} />
      <ImageUpload label="Plan Image" value={image} onChange={setImage} />
      <Button onClick={handleUpload} disabled={loading || !name || !image}>
        {loading ? 'Uploading...' : 'Upload Plan'}
      </Button>
    </div>
  )
}
