import type { ChecklistItemStatus } from '@/entities/checklist'

export const getStatusDescription = (status: ChecklistItemStatus) => {
  switch (status) {
    case 'Not started':
      return 'Not started'
    case 'In progress':
      return 'In progress'
    case 'Blocked':
      return 'Blocked: Part installation done'
    case 'Final Check awaiting':
      return 'Final Check awaiting'
    case 'Done':
      return 'Done: Part installation done'
  }
}
