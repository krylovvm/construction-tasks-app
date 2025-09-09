import { FC, ReactNode, useState, useRef, useEffect, MouseEvent } from 'react'
import type { Task } from '@/entities/task'
import { useTaskStore } from '@/entities/task/model/store'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'

interface TaskListItemProps {
  task: Task
  onClick?: () => void
  isActive?: boolean
  children?: ReactNode
}

export const TaskListItem: FC<TaskListItemProps> = ({ task, onClick, isActive, children }) => {
  const { updateTask, deleteTask } = useTaskStore()
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [titleText, setTitleText] = useState(task.title)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditingTitle && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditingTitle])

  const handleTitleClick = () => {
    setIsEditingTitle(true)
  }

  const handleTitleChange = async () => {
    if (titleText.trim() && titleText !== task.title) {
      await updateTask(task, {
        title: titleText.trim(),
      })
    } else {
      setTitleText(task.title)
    }
    setIsEditingTitle(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleChange()
    } else if (e.key === 'Escape') {
      setTitleText(task.title)
      setIsEditingTitle(false)
    }
  }

  const handleClickDelete = (e: MouseEvent) => {
    e.stopPropagation()
    deleteTask(task.id)
  }

  return (
    <div
      className={`border rounded-md mb-2 transition cursor-pointer ${
        isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="p-3">
        <div className="flex items-center justify-between">
          {isEditingTitle ? (
            <Input
              ref={inputRef}
              value={titleText}
              onChange={e => setTitleText(e.target.value)}
              onBlur={handleTitleChange}
              onKeyDown={handleKeyDown}
              className="w-full px-2 py-1 border border-gray-300 rounded h-6"
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <div className="font-medium text-gray-900 cursor-text" onClick={handleTitleClick}>
              {task.title}
            </div>
          )}
          <div className="flex items-center space-x-2 ml-2">
            {isActive && (
              <Button
                onClick={handleClickDelete}
                aria-label="Delete Task"
                title="Delete Task"
                variant="secondary"
              >
                Delete
              </Button>
            )}
            <Button
              className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-200 hover:shadow-lg hover:text-gray-700 transition cursor-pointer"
              onClick={onClick}
              type="button"
              aria-label="Expand Task"
            >
              <span className="text-xl font-bold">{'>'}</span>
            </Button>
          </div>
        </div>
        {isActive && <div className="mt-2 border-t border-gray-200 pt-2">{children}</div>}
      </div>
    </div>
  )
}
