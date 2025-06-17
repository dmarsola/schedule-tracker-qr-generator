import BaseLayout from '@/src/components/BaseLayout'
import ScheduleManager from '@/src/components/ScheduleManager'
import { Card } from 'primereact/card'

export default function Home() {
  return (
    <BaseLayout>
      <Card className="min-vh-100">
        <ScheduleManager />
        {/* <div className="container-fluid overflow-hidden text-center pt-5"></div> */}
      </Card>
    </BaseLayout>
  )
}
