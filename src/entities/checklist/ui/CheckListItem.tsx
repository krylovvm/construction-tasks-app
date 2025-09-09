import { useState, useRef, useEffect, FC } from 'react'
import { ChecklistItem, ChecklistItemStatus } from '../model/types'
import { useChecklistStore } from '../model/store'
import { getStatusDescription } from '../lib/'
import { Button, Input } from '@/shared/ui'

interface CheckListItemProps {
  item: ChecklistItem
  checklistId: string
}

const getStatusInfo = (status: ChecklistItemStatus) => {
  switch (status) {
    case 'Not started':
      return { color: 'bg-gray-300', icon: null, textColor: 'text-gray-500' }
    case 'In progress':
      return { color: 'bg-blue-500', icon: null, textColor: 'text-blue-500' }
    case 'Blocked':
      return {
        color: 'bg-red-500',
        icon: (
          <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ),
        textColor: 'text-red-500',
      }
    case 'Final Check awaiting':
      return { color: 'bg-yellow-500', icon: null, textColor: 'text-yellow-500' }
    case 'Done':
      return {
        color: 'bg-green-500',
        icon: (
          <svg
            className="w-4 h-4 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ),
        textColor: 'text-green-500',
      }
  }
}

export const CheckListItem: FC<CheckListItemProps> = ({ item, checklistId }) => {
  const { updateChecklistItem, deleteChecklistItem } = useChecklistStore()
  const [isEditingText, setIsEditingText] = useState(false)
  const [isSelectingStatus, setIsSelectingStatus] = useState(false)
  const [itemText, setItemText] = useState(item.text)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isSelectingStatus && !(e.target as HTMLElement)?.closest(`.status-menu-${item.id}`)) {
        setIsSelectingStatus(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSelectingStatus, item.id])

  useEffect(() => {
    if (isEditingText && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditingText])

  const statusInfo = getStatusInfo(item.status)

  const handleStatusChange = async (status: ChecklistItemStatus) => {
    await updateChecklistItem(checklistId, { ...item, status })
    setIsSelectingStatus(false)
  }

  const handleTextChange = async () => {
    if (itemText.trim() && itemText !== item.text) {
      await updateChecklistItem(checklistId, { ...item, text: itemText.trim() })
    } else {
      setItemText(item.text)
    }
    setIsEditingText(false)
  }

  const handleDeleteChecklistItem = async () => {
    await deleteChecklistItem(checklistId, item.id)
  }

  return (
    <div className="flex flex-col space-y-1 py-2">
      <div className="flex items-start">
        <div className="relative">
          <button
            onClick={() => setIsSelectingStatus(!isSelectingStatus)}
            className={`w-6 h-6 rounded border flex items-center justify-center mr-3 ${
              item.status === 'Done'
                ? 'border-green-500 bg-green-50'
                : item.status === 'Blocked'
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300'
            }`}
          >
            {statusInfo.icon}
          </button>

          {isSelectingStatus && (
            <div
              className={`absolute z-10 mt-1 bg-white rounded-md shadow-lg border border-gray-200 py-1 w-48 status-menu-${item.id}`}
            >
              {['Not started', 'In progress', 'Blocked', 'Final Check awaiting', 'Done'].map(
                status => {
                  const info = getStatusInfo(status as ChecklistItemStatus)
                  return (
                    <button
                      key={status}
                      className="w-full px-3 py-2 text-left flex items-center hover:bg-gray-100"
                      onClick={() => handleStatusChange(status as ChecklistItemStatus)}
                    >
                      <span className={`w-3 h-3 ${info.color} rounded-full mr-2`}></span>
                      <span>{status}</span>
                    </button>
                  )
                }
              )}
            </div>
          )}
        </div>

        {isEditingText ? (
          <div className="flex-grow">
            <Input
              ref={inputRef}
              value={itemText}
              onChange={e => setItemText(e.target.value)}
              onBlur={handleTextChange}
              onKeyDown={e => e.key === 'Enter' && handleTextChange()}
              className="w-full px-2 py-1 border border-gray-300 rounded h-6"
            />
          </div>
        ) : (
          <div className="flex-grow cursor-pointer" onClick={() => setIsEditingText(true)}>
            <span>{item.text}</span>
          </div>
        )}
        <Button
          className="w-8 h-8 flex items-center justify-center rounded-full  text-gray-500 hover:bg-gray-200 hover:shadow-lg hover:text-gray-700 transition cursor-pointer"
          onClick={handleDeleteChecklistItem}
          type="button"
          aria-label="Delete Checklist Item"
        >
          <span className="text-xl font-bold">&times;</span>
        </Button>
      </div>

      <div className={`flex items-center text-xs ${statusInfo.textColor} ml-9`}>
        <span className={`w-2 h-2 ${statusInfo.color} rounded-full mr-1`}></span>
        <span>{getStatusDescription(item.status)}</span>
      </div>
    </div>
  )
}
