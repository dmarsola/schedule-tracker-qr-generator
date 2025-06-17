'use client'

import { Button } from 'primereact/button'
import { useCallback } from 'react'

export default function ExportToPDF() {
  const handlePrint = useCallback(() => {
    window.print()
  }, [])

  return (
    <div className="my-3 text-center print-hide">
      <Button
        type="button"
        icon="pi pi-print"
        label="Print or Save as PDF"
        className="btn btn-primary"
        onClick={handlePrint}
        aria-label="Save current content to PDF or print"
        aria-describedby="pdfHelp"
      />
      <small id="pdfHelp" className="form-text text-muted visually-hidden">
        This button opens the browser print dialog, where you can print or save as PDF.
      </small>
    </div>
  )
}
