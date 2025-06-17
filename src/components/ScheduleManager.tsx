'use client'

import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { OrderList } from 'primereact/orderlist'
import { useState } from 'react'

interface ScheduleEntry {
  id: string
  activity: string
  icon?: string
  time?: Date | null
  frequency?: string
}

const icons = ['📚 Study', '🏃 Exercise', '🎵 Music', '💼 Work'].map((i) => ({ label: i, value: i }))
const frequencies = ['Daily', 'Weekly', 'Monthly'].map((f) => ({ label: f, value: f }))

const formDefault: ScheduleEntry = {
  id: '',
  activity: '',
  icon: undefined,
  time: undefined,
  frequency: undefined,
}

export default function ScheduleManager() {
  const [entries, setEntries] = useState<ScheduleEntry[]>([])
  const [form, setForm] = useState<ScheduleEntry>({ ...formDefault })
  const [editingId, setEditingId] = useState<string | null>(null)

  const resetForm = () => {
    setForm({ ...formDefault })
    setEditingId(null)
  }

  const handleSubmit = () => {
    if (editingId) {
      setEntries((prev) => prev.map((e) => (e.id === editingId ? { ...form, id: editingId } : e)))
    } else {
      setEntries((prev) => [...prev, { ...form, id: Date.now().toString() }])
    }
    resetForm()
  }

  const handleEdit = (entry: ScheduleEntry) => {
    setForm({ ...entry })
    setEditingId(entry.id)
  }

  const handleDelete = (id: string) => {
    // TODO: not quite working yet
    setEntries((prev) => prev.filter((e) => e.id !== id))
    if (editingId === id) resetForm()
  }

  const itemTemplate = (item: ScheduleEntry) => (
    <div className="d-flex justify-content-between align-items-center w-100">
      <div>
        <strong>{item.icon}</strong> {item.activity} at {item.time?.toLocaleTimeString() ?? '--'} ({item.frequency})
      </div>
      <div>
        <Button icon="pi pi-pencil" text onClick={() => handleEdit(item)} />
        <Button icon="pi pi-trash" text severity="danger" onClick={() => handleDelete(item.id)} />
      </div>
    </div>
  )

  return (
    <div className="container mt-4">
      <h4>Create Activity Schedule</h4>
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <label className="form-label">Schedule</label>
          <InputText value={form.activity} onChange={(e) => setForm({ ...form, activity: e.target.value })} className="form-control" />
        </div>
        <div className="col-md-4">
          <label className="form-label">Icon</label>
          <Dropdown
            value={form.icon}
            options={icons}
            onChange={(e) => setForm({ ...form, icon: e.value })}
            placeholder="Select icon"
            className="w-100"
            showClear
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Time</label>
          <Calendar
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.value as Date })}
            timeOnly
            showIcon
            hourFormat="24"
            className="w-100"
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Frequency</label>
          <Dropdown
            value={form.frequency}
            options={frequencies}
            onChange={(e) => setForm({ ...form, frequency: e.value })}
            placeholder="Select frequency"
            className="w-100"
            showClear
          />
        </div>
        <div className="col-12">
          <Button label={editingId ? 'Update Entry' : 'Add Entry'} onClick={handleSubmit} />
          {editingId && <Button label="Cancel" className="btn btn-secondary ms-2" onClick={resetForm} severity="secondary" />}
        </div>
      </div>

      <OrderList
        dataKey="id"
        value={entries}
        onChange={(e) => setEntries(e.value)}
        itemTemplate={itemTemplate}
        header="Your Activities (drag to reorder)"
        dragdrop
        listStyle={{ height: 'auto' }}
        className="mb-5"
      />
    </div>
  )
}
