import { FC, useState } from 'react'
import { useTaskStore } from '../../../entities/task'
import { Button } from '../../../shared/ui'
import { TaskModal } from './TaskModal'

interface Props {
  planId: string
  onTaskSelect?: (taskId: string) => void
}

export const TaskList: FC<Props> = ({ planId, onTaskSelect }) => {
  const { tasks, activeTaskId, setActiveTask, addTask, updateTask, deleteTask } = useTaskStore()
  const [formOpen, setFormOpen] = useState(false)
  const [editTaskId, setEditTaskId] = useState<string | null>(null)
  // TODO: fix type
  const handleCreate = (title: string, status: string) => {
    addTask({ planId, title, status: status as 'new' | 'in-progress' | 'done', x: 50, y: 50 }).then(
      () => setFormOpen(false)
    )
  }

  const handleEdit = (id: string, title: string, status: 'new' | 'in-progress' | 'done') => {
    updateTask(id, { title, status }).then(() => setEditTaskId(null))
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">Tasks</h2>
        <Button onClick={() => setFormOpen(true)}>Add Task</Button>
      </div>
      <ul className="space-y-2">
        {tasks
          .filter(t => t.planId === planId)
          .map(task => (
            <li
              key={task.id}
              className={`p-2 rounded border ${task.id === activeTaskId ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
              onClick={() => {
                setActiveTask(task.id)
                onTaskSelect?.(task.id)
              }}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold">{task.title}</span>
                <span className="text-xs px-2 py-1 rounded bg-gray-100">{task.status}</span>
              </div>
              <div className="flex gap-2 mt-1">
                <Button onClick={() => setEditTaskId(task.id)}>Edit</Button>
                <Button onClick={() => deleteTask(task.id)}>Delete</Button>
              </div>
              {editTaskId === task.id && (
                <TaskModal
                  planId={planId}
                  initial={{ title: task.title, status: task.status }}
                  onSubmit={(title, status) => handleEdit(task.id, title, status as any)} // TODO: fix type
                  onClose={() => setEditTaskId(null)}
                  open={true}
                />
              )}
            </li>
          ))}
      </ul>
      <TaskModal
        planId={planId}
        onSubmit={handleCreate}
        onClose={() => setFormOpen(false)}
        open={formOpen}
      />
    </div>
  )
}
