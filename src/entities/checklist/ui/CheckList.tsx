import { FC, useEffect, useState, useRef } from 'react'
import { useChecklistStore } from '../model/store'
import { CheckListItem } from './CheckListItem'
import { Input } from '@/shared/ui/Input'
import { AddChecklistItemButton } from './AddChecklistItemButton'

interface CheckListProps {
  taskId: string
}

export const CheckList: FC<CheckListProps> = ({ taskId }) => {
  const { checklists, fetchChecklists, updateChecklist } = useChecklistStore()
  const [isEditingTitle, setIsEditingTitle] = useState<string | null>(null)
  const [titleText, setTitleText] = useState('')
  const titleInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    fetchChecklists(taskId)
  }, [fetchChecklists, taskId])

  useEffect(() => {
    if (isEditingTitle && titleInputRef.current) {
      titleInputRef.current.focus()
      titleInputRef.current.select()
    }
  }, [isEditingTitle])

  const handleTitleClick = (id: string, title: string) => {
    setIsEditingTitle(id)
    setTitleText(title)
  }

  const handleTitleSave = async (checklist: any) => {
    if (titleText.trim() && titleText !== checklist.title) {
      await updateChecklist({
        ...checklist,
        title: titleText.trim(),
      })
    }
    setIsEditingTitle(null)
  }

  const handleKeyDown = (e: React.KeyboardEvent, checklist: any) => {
    if (e.key === 'Enter') {
      handleTitleSave(checklist)
    } else if (e.key === 'Escape') {
      setIsEditingTitle(null)
    }
  }

  return (
    <div>
      {checklists.map(cl => (
        <div key={cl.id} className="mb-6 text-left">
          {isEditingTitle === cl.id ? (
            <div className="mb-2">
              <Input
                ref={titleInputRef}
                value={titleText}
                onChange={e => setTitleText(e.target.value)}
                onBlur={() => handleTitleSave(cl)}
                onKeyDown={e => handleKeyDown(e, cl)}
                className="w-full px-2 py-1 border border-gray-300 rounded h-6"
              />
            </div>
          ) : (
            <h3
              className="font-medium mb-2 cursor-text"
              onClick={() => handleTitleClick(cl.id, cl.title)}
            >
              {cl.title}
            </h3>
          )}
          <ul className="space-y-2">
            {cl.items.map(item => (
              <CheckListItem key={item.id} checklistId={cl.id} item={item} />
            ))}
          </ul>
          <AddChecklistItemButton checklistId={cl.id} />
        </div>
      ))}
    </div>
  )
}
