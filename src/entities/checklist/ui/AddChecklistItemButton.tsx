import React from 'react'
import { useChecklistStore } from '../model/store'

interface AddChecklistItemButtonProps {
  checklistId: string
}

export const AddChecklistItemButton: React.FC<AddChecklistItemButtonProps> = ({ checklistId }) => {
  const { addChecklistItem } = useChecklistStore()

  const handleAddItem = async () => {
    await addChecklistItem(checklistId, 'New item', 'Not started')
  }

  return (
    <button
      onClick={handleAddItem}
      className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors mt-4 group"
    >
      <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-current">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <span className="font-medium text-sm group-hover:underline">ADD NEW ITEM</span>
    </button>
  )
}
