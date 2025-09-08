import { Plan } from '@/widgets/'
import { Button } from '@/shared/ui'
import { useParams } from 'react-router-dom'

export const PlanDetail = () => {
  const { id: planId } = useParams<{ id: string }>()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">123</h1>
        <Button>Delete</Button>
      </div>
      {planId && <Plan planId={planId} />}
    </div>
  )
}
