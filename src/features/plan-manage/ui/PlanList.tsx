import { FC } from 'react';
import { usePlanStore } from '@/entities/plan';
import { Thumbnail, Button } from '@/shared/ui';

interface Props {
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
  activePlanId: string | null;
}

export const PlanList: FC<Props> = ({ onSelect, onDelete, activePlanId }) => {
  const { plans } = usePlanStore();

  return (
    <div className="flex gap-4 flex-wrap">
      {plans.map(plan => (
        <div
          key={plan.id}
          className={`border rounded p-2 ${plan.id === activePlanId ? 'border-blue-500' : 'border-gray-200'}`}
        >
          <Thumbnail src={plan.image} alt={plan.name} />
          <div className="mt-2 text-sm">{plan.name}</div>
          <div className="flex gap-2 mt-2">
            <Button onClick={() => onSelect(plan.id)} disabled={plan.id === activePlanId}>
              {plan.id === activePlanId ? 'Active' : 'Set Active'}
            </Button>
            <Button onClick={() => onDelete(plan.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
