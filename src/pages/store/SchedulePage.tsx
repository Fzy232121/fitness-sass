import { Card, Calendar, Tag, Badge } from 'antd'
import type { Dayjs } from 'dayjs'

const scheduleData: Record<string, { type: string; content: string }[]> = {
  '2024-12-16': [{ type: 'success', content: '陈教练 值班' }],
  '2024-12-17': [{ type: 'processing', content: '刘教练 瑜伽课' }],
  '2024-12-18': [{ type: 'warning', content: '前台早班' }],
}

export default function SchedulePage() {
  const dateCellRender = (value: Dayjs) => {
    const key = value.format('YYYY-MM-DD')
    const data = scheduleData[key]
    return data ? data.map((item, i) => <p key={i} style={{ margin: 0, fontSize: 12 }}><Badge status={item.type as any} text={item.content} /></p>) : null
  }

  return (
    <Card title="排班管理">
      <Calendar cellRender={(current, info) => info.type === 'date' ? dateCellRender(current) : null} />
    </Card>
  )
}
