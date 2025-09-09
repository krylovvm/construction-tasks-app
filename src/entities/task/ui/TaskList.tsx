import { FC, useState } from 'react'
import { useTaskStore } from '@/entities/task'
import { TaskModal } from './TaskModal'
import { TaskListItem } from './TaskListItem'
interface TaskListProps {
  planId: string
  onTaskSelect?: (taskId: string) => void
}

export const TaskList: FC<TaskListProps> = ({ planId, onTaskSelect }) => {
  const { tasks, activeTaskId, setActiveTask, updateTask, deleteTask } = useTaskStore()
  const [editTaskId, setEditTaskId] = useState<string | null>(null)

  const handleEdit = (id: string, title: string) => {
    updateTask(id, { title }).then(() => setEditTaskId(null))
  }

  if (tasks.length === 0) {
    return (
      <div className="grid items-center text-gray-500 text-center">
        No tasks yet. Add new ones by clicking on the plan.
      </div>
    )
  }

  return (
    <div>
      <ul className="space-y-2">
        {tasks
          .filter(t => t.planId === planId)
          .map(task => (
            <li key={task.id}>
              <TaskListItem
                task={
                  {
                    ...task,
                    checklist: [
                      {
                        id: '1',
                        title: 'Light Bulb 150S',
                        status: 'not_started',
                        description: 'Install standard light bulb in position',
                      },
                      {
                        id: '2',
                        title: 'Electrical connection, general, 3-pin',
                        status: 'blocked',
                        description: 'Part installation done',
                      },
                      {
                        id: '3',
                        title: 'Check connection stability',
                        status: 'in_progress',
                        description: 'Final installation check',
                      },
                      {
                        id: '4',
                        title: 'L3.1 LED surface-mounted wall light',
                        status: 'done',
                        description: 'L3.1 LED surface-mounted wall light installed',
                      },
                      {
                        id: '5',
                        title: 'Electrical connection, general, 3-pin',
                        status: 'done',
                        description: 'Done: Part installation done',
                      },
                    ],
                  } as any
                }
                isActive={task.id === activeTaskId}
                onClick={() => {
                  setActiveTask(task.id)
                  onTaskSelect?.(task.id)
                }}
              />
              {/* TODO */}
              {/* <div className="flex gap-2 mt-1">
                <Button onClick={() => setEditTaskId(task.id)}>Edit</Button>
                <Button onClick={() => deleteTask(task.id)}>Delete</Button>
              </div> */}
              {editTaskId === task.id && (
                <TaskModal
                  planId={planId}
                  initial={{ title: task.title }}
                  onSubmit={title => handleEdit(task.id, title)}
                  onClose={() => setEditTaskId(null)}
                  open={true}
                />
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}
