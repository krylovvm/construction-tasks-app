export type ChecklistItemStatus =
  | 'Not started'
  | 'In progress'
  | 'Blocked'
  | 'Final Check awaiting'
  | 'Done'

export interface ChecklistItem {
  id: string
  text: string
  status: ChecklistItemStatus
}

export interface Checklist {
  id: string
  taskId: string
  title: string
  items: ChecklistItem[]
  createdAt: number
  updatedAt: number
}
