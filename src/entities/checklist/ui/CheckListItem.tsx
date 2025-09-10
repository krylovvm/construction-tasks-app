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
      return {
        color: 'bg-blue-500',
        icon: (
          <svg
            className="w-5 h-5 text-blue-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z"
              fill="currentColor"
            />
            <path
              d="M15.95 12.28C15.74 12.71 15.26 12.88 14.83 12.67L12.49 11.41V7C12.49 6.59 12.82 6.25 13.24 6.25C13.66 6.25 13.99 6.59 13.99 7V10.5L15.73 11.44C16.15 11.65 16.32 12.14 15.95 12.28Z"
              fill="currentColor"
            />
          </svg>
        ),
        textColor: 'text-blue-500',
      }
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
      return {
        color: 'bg-yellow-500',
        icon: (
          <svg
            className="w-5 h-5 text-yellow-500"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M12 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 16H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M9 3L12 3L15 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="8.5" cy="12.5" r="1.5" fill="currentColor" />
            <circle cx="8.5" cy="16.5" r="1.5" fill="currentColor" />
          </svg>
        ),
        textColor: 'text-yellow-500',
      }
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
    <div className="flex flex-col py-1">
      <div className="flex items-start">
        <div className="relative mt-1">
          <button
            onClick={() => setIsSelectingStatus(!isSelectingStatus)}
            className={`w-6 h-6 rounded border flex items-center justify-center mr-3 cursor-pointer ${
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
          <div className="flex-grow cursor-text" onClick={() => setIsEditingText(true)}>
            <span>{item.text}</span>
          </div>
        )}
        <Button
          className="w-6 h-6 flex items-center justify-center rounded-full  text-gray-500 hover:bg-gray-200 hover:shadow-lg hover:text-gray-700 transition cursor-pointer"
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
