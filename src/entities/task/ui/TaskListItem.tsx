import React from 'react'

type TaskStatus = 'new' | 'in_progress' | 'blocked' | 'done'

interface ChecklistItem {
  id: string
  title: string
  status: 'not_started' | 'blocked' | 'in_progress' | 'done'
  description?: string
}

interface TaskListItemProps {
  task: {
    id: string
    title: string
    status: TaskStatus
    checklist: ChecklistItem[]
  }
  onClick?: () => void
  isActive?: boolean
}

export const TaskListItem: React.FC<TaskListItemProps> = ({ task, onClick, isActive }) => {
  const [isExpanded, setIsExpanded] = React.useState(false)

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(prev => !prev)
  }

  const getChecklistItemStatus = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'blocked':
        return <span className="w-2 h-2 rounded-full bg-red-500"></span>
      case 'in_progress':
        return <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
      case 'done':
        return <span className="w-2 h-2 rounded-full bg-green-500"></span>
      default:
        return <span className="w-2 h-2 rounded-full bg-gray-300"></span>
    }
  }

  const getChecklistIcon = (item: ChecklistItem) => {
    switch (item.status) {
      case 'blocked':
        return (
          <div className="flex items-center justify-center w-6 h-6 bg-red-50 rounded-full border border-red-200">
            <span className="text-red-500">!</span>
          </div>
        )
      case 'done':
        return (
          <div className="flex items-center justify-center w-6 h-6 bg-green-50 rounded-full border border-green-200">
            <svg
              className="w-4 h-4 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )
      case 'in_progress':
        return (
          <div className="flex items-center justify-center w-6 h-6 bg-blue-50 rounded-full border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          </div>
        )
      default:
        return (
          <div className="flex items-center justify-center w-6 h-6 bg-gray-50 rounded-full border border-gray-200"></div>
        )
    }
  }

  const completedItems = task.checklist?.filter(item => item.status === 'done').length || 0
  const totalItems = task.checklist?.length || 0

  return (
    <div
      className={`border rounded-md overflow-hidden mb-2 transition ${
        isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
      } ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className="p-3">
        <div className="flex items-start">
          <div className="flex-grow">
            <div className="font-medium text-gray-900">{task.title}</div>
            {task.status === 'blocked' && (
              <div className="flex items-center text-xs text-red-500 mt-1">
                <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                Ticket progress is blocked
              </div>
            )}
          </div>
        </div>

        {task.checklist?.length > 0 && (
          <>
            <div className="flex items-center justify-between mt-3 border-t pt-2">
              <div className="text-sm font-medium text-gray-700">Checklist</div>
              <button className="text-gray-400 hover:text-gray-600" onClick={toggleExpanded}>
                {isExpanded ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>
            </div>

            <div className="text-xs text-gray-500 mt-1">
              {completedItems} of {totalItems} steps completed
            </div>

            {isExpanded && (
              <div className="mt-2 space-y-2">
                {task.checklist.map(item => (
                  <div key={item.id} className="flex items-start p-2 rounded-md bg-gray-50">
                    <div className="mr-2 mt-0.5">{getChecklistIcon(item)}</div>
                    <div className="flex-grow">
                      <div className="text-sm">{item.title}</div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        {getChecklistItemStatus(item.status)}
                        <span className="ml-1">
                          {item.status === 'not_started' && 'Not started'}
                          {item.status === 'blocked' && 'Blocked: Part installation done'}
                          {item.status === 'in_progress' && 'In progress'}
                          {item.status === 'done' && 'Done: Part installation done'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
