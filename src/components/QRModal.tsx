import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import QRCode from 'react-qr-code'

interface QRModalProps {
  value: string
  visible: boolean
  onHide: () => void
}

export default function QRModal({ value, visible, onHide }: QRModalProps) {
  // console.log('generate qr for: ', value)
  return (
    <Dialog header="QR Code" visible={visible} onHide={onHide} modal>
      <div className="d-flex justify-content-center align-items-center flex-column p-3">
        <QRCode value={JSON.stringify(value)} size={600} />
        <p className="mt-3 text-center text-muted">Scan with the app</p>
        <Button label="Close" className="mt-3" onClick={onHide} />
      </div>
    </Dialog>
  )
}
