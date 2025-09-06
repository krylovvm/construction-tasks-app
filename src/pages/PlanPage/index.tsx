import React, { useEffect } from 'react';
import { useUserStore } from '@/entities/user';
import { usePlanStore } from '@/entities/plan';
import { PlanUpload, PlanList } from '@/features/plan-manage';

export const PlanPage: React.FC = () => {
  const { currentUser } = useUserStore();
  const { plans, fetchPlans, activePlanId, setActivePlan, deletePlan, getActivePlan } =
    usePlanStore();

  useEffect(() => {
    if (currentUser) fetchPlans(currentUser.id);
  }, [currentUser, fetchPlans]);

  if (!currentUser) {
    return <div className="p-8 text-center">Please login to manage your plans.</div>;
  }

  const activePlan = getActivePlan();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Your Plans</h1>
      <PlanUpload />
      <PlanList onSelect={setActivePlan} onDelete={deletePlan} activePlanId={activePlanId} />
      {activePlan && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Active Plan</h2>
          <img
            src={activePlan.image}
            alt={activePlan.name}
            className="border rounded shadow max-w-full"
          />
          <div className="mt-2 text-gray-700">{activePlan.name}</div>
        </div>
      )}
    </div>
  );
};
