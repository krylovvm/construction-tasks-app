import { FC } from 'react'
import type { Plan } from '../model/types'
import { Link } from 'react-router-dom'
import { PATHS } from '@/shared/config/paths'

interface PlanCardProps {
  plan: Plan
}

export const PlanCard: FC<PlanCardProps> = ({ plan }) => (
  <Link
    to={`${PATHS.PLANS}/${plan.id}`}
    className="group relative rounded-xl overflow-hidden shadow hover:shadow-xl transition-all border border-gray-200 hover:border-blue-500 bg-white block focus:outline-none focus:ring-2 focus:ring-blue-500"
    tabIndex={0}
  >
    <div className="w-full aspect-[4/3] bg-gray-100 overflow-hidden">
      <img
        src={plan.image}
        alt={plan.name}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-4 flex flex-col gap-2">
      <div className="font-semibold text-lg truncate text-gray-800">{plan.name}</div>
    </div>
  </Link>
)
