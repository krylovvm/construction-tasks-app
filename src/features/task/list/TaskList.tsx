import { FC } from 'react'
import { TaskListItem, useTaskStore } from '@/entities/task/'
import { CheckList } from '@/entities/checklist'

interface TaskListProps {
  planId: string
}

export const TaskList: FC<TaskListProps> = ({ planId }) => {
  const { tasks, activeTaskId, setActiveTask } = useTaskStore()

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
                task={task}
                isActive={task.id === activeTaskId}
                onClick={() => {
                  setActiveTask(task.id)
                }}
                children={<CheckList taskId={task.id} />}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}
