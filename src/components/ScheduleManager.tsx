'use client'

import QRModal from '@/components/QRModal'
import { eventFrequency } from '@/utils/constants/eventFrequency'
import { iconMap, importAllIcons } from '@/utils/constants/icons'
import { DropdownData, getDropdownValue } from '@/utils/helpers/dropdown'
import { formatForExport } from '@/utils/helpers/schedule'
import { useToast } from '@/utils/providers/toast'
import { ScheduleEntry } from '@/utils/types/schedule'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'primereact/button'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import { OrderList } from 'primereact/orderlist'
import { useState } from 'react'

const formDefault: ScheduleEntry = {
  id: '',
  label: '',
  icon: undefined,
  time: undefined,
  frequency: undefined,
}

export default function ScheduleManager() {
  const [modalVisible, setModalVisible] = useState(false)
  const [entries, setEntries] = useState<ScheduleEntry[]>([])
  const [form, setForm] = useState<ScheduleEntry>({ ...formDefault })
  const [editingId, setEditingId] = useState<string | null>(null)
  const { showToast } = useToast()

  importAllIcons(library)

  const resetForm = () => {
    setForm({ ...formDefault })
    setEditingId(null)
  }

  const handleSubmit = () => {
    if (form.label.length == 0) {
      showToast({
        severity: 'info',
        summary: 'Activity name missing',
        detail: 'Enter a name for the Schedule Activity.',
        life: 3000,
      })
    } else {
      if (editingId) {
        setEntries((prev) => prev.map((e) => (e.id === editingId ? { ...form, id: editingId } : e)))
      } else {
        setEntries((prev) => [...prev, { ...form, id: Date.now().toString() }])
      }
      resetForm()
    }
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
        <>{item.icon && <FontAwesomeIcon className="me-2" icon={item.icon as IconName} />}</>
        <>{item.label}</>
        <>{item.time && ` at ${item.time.toLocaleTimeString()}`}</>
        <>{item.frequency && ` - ${item.frequency}`}</>
      </div>
      <div>
        <Button text onClick={() => handleEdit({ ...item })} className="p-1 m-auto">
          <i className="pi pi-pencil m-auto pointer-auto" />
        </Button>
        <Button text severity="danger" onClick={() => handleDelete(item.id)} className="p-1">
          <i className="pi pi-trash m-auto pointer-auto" />
        </Button>
      </div>
    </div>
  )

  const iconOptionTemplate = (option: DropdownData) => {
    // TODO: apply the correct primereact type for option
    if (option) {
      return (
        <div>
          <FontAwesomeIcon className="me-2" icon={option.value as IconName} /> {option.name}
        </div>
      )
    } else {
      return (
        <div className="flex align-items-center">
          <div>Select an option</div>
        </div>
      )
    }
  }

  return (
    <div className="container mt-4">
      <h4>Create Activity Schedule</h4>
      <div className="row g-3 mb-3">
        <div className="col-md-4">
          <label className="form-label">Activity</label>
          <InputText className="w-100" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
        </div>
        <div className="col-md-2">
          <label className="form-label">Icon</label>
          <Dropdown
            optionLabel="name"
            value={form.icon}
            itemTemplate={iconOptionTemplate}
            valueTemplate={iconOptionTemplate}
            options={getDropdownValue(iconMap)}
            onChange={(e) => setForm({ ...form, icon: e.value })}
            placeholder="Select icon"
            className="w-100"
            filter
            showClear
          />
        </div>
        <div className="col-md-2">
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
        <div className="col-md-2">
          <label className="form-label">Frequency</label>
          <Dropdown
            optionLabel="name"
            value={form.frequency}
            options={getDropdownValue(eventFrequency)}
            onChange={(e) => setForm({ ...form, frequency: e.value })}
            placeholder="Select frequency"
            className="w-100"
            showClear
          />
        </div>
        <div className="row g-3 mb-3 justify-content-between">
          <div className="col-sm-6">
            <Button label={editingId ? 'Update Entry' : 'Add Entry'} onClick={handleSubmit} />
            {editingId && <Button label="Cancel" className="btn btn-secondary ms-2" onClick={resetForm} severity="secondary" />}
          </div>
          <div className="col-sm-6 text-sm-end">
            <Button
              label={'Get QR code'}
              onClick={() => {
                setModalVisible(true)
              }}
            />
            {entries && (
              <QRModal value={JSON.stringify(formatForExport([...entries]))} visible={modalVisible} onHide={() => setModalVisible(false)} />
            )}
          </div>
        </div>
      </div>

      <OrderList
        dataKey="id"
        value={entries}
        onChange={(e) => setEntries([...e.value])}
        itemTemplate={itemTemplate}
        header="Your Activities (drag to reorder)"
        dragdrop
        listStyle={{ height: 'auto' }}
        className="mb-1"
      />
    </div>
  )
}
