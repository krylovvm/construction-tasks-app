import { FC } from 'react'
import { useChecklistStore } from '../model/store'

interface AddChecklistItemButtonProps {
  checklistId: string
}

export const AddChecklistItemButton: FC<AddChecklistItemButtonProps> = ({ checklistId }) => {
  const { addChecklistItem } = useChecklistStore()

  const handleAddItem = async () => {
    await addChecklistItem(checklistId, 'New item', 'Not started')
  }

  return (
    <button
      onClick={handleAddItem}
      className="ronded flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors mt-4 cursor-pointer"
    >
      <div className="flex items-center w-6 h-6 rounded border flex items-center justify-center cursor-pointer">
        <span className="mb-0.5">+</span>
      </div>
      <span className="font-medium text-sm ml-1">ADD NEW ITEM</span>
    </button>
  )
}
