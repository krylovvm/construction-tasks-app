import { FC, useState } from 'react'
import { Button, Input, Modal } from '@/shared/ui'

interface Props {
  planId: string
  initial?: { title?: string; status?: string }
  onSubmit: (title: string, status: string) => void
  onClose: () => void
  open: boolean
}

export const TaskModal: FC<Props> = ({ initial, onSubmit, onClose, open }) => {
  const [title, setTitle] = useState(initial?.title || '')
  const [status, setStatus] = useState(initial?.status || 'new')

  if (!open) return null

  return (
    <Modal isOpen={open} onClose={onClose} title="Task">
      <form
        onSubmit={e => {
          e.preventDefault()
          onSubmit(title, status)
        }}
        className="space-y-4"
      >
        <Input label="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <div>
          <label className="block text-sm mb-1">Status</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          >
            <option value="new">New</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </Modal>
  )
}
