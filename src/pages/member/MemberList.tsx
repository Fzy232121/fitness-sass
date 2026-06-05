import { Card, Table, Tag, Button, Space, Input, Select, Avatar } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { mockMembers } from '@/mock'

const statusColor: Record<string, string> = { normal: 'green', frozen: 'orange', expired: 'red', cancelled: 'default' }
const statusLabel: Record<string, string> = { normal: '正常', frozen: '冻结', expired: '过期', cancelled: '作废' }

export default function MemberList() {
  const navigate = useNavigate()
  const [members] = useState(mockMembers)

  const columns = [
    { title: '会员编号', dataIndex: 'memberNo', key: 'memberNo', width: 120 },
    { title: '姓名', dataIndex: 'name', key: 'name', render: (name: string) => <Space><Avatar size="small">{name[0]}</Avatar>{name}</Space> },
    { title: '手机号', dataIndex: 'phone', key: 'phone' },
    { title: '标签', dataIndex: 'tags', key: 'tags', render: (tags: string[]) => tags.map((t) => <Tag key={t} color="blue">{t}</Tag>) },
    { title: '门店', dataIndex: 'storeName', key: 'storeName' },
    { title: '私教余课', dataIndex: 'ptRemain', key: 'ptRemain', render: (v: number) => v > 0 ? <Tag color="purple">{v}节</Tag> : '-' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: string) => <Tag color={statusColor[v]}>{statusLabel[v]}</Tag> },
    { title: '入会时间', dataIndex: 'joinDate', key: 'joinDate' },
    {
      title: '操作', key: 'action', render: (_: unknown, r: any) => (
        <Space>
          <Button size="small" type="link" onClick={() => navigate(`/member/detail/${r.id}`)}>详情</Button>
        </Space>
      ),
    },
  ]

  return (
    <Card title="会员列表" extra={<Button type="primary" onClick={() => navigate('/card/sale')}>新增会员</Button>}>
      <Space style={{ marginBottom: 16 }} wrap>
        <Input placeholder="姓名/手机号" allowClear style={{ width: 200 }} />
        <Select placeholder="会员状态" allowClear style={{ width: 120 }} options={Object.entries(statusLabel).map(([v, l]) => ({ value: v, label: l }))} />
        <Select placeholder="门店" allowClear style={{ width: 140 }} options={[{ label: '总部旗舰店', value: 1 }, { label: '望京店', value: 2 }, { label: '中关村店', value: 3 }]} />
      </Space>
      <Table columns={columns} dataSource={members} rowKey="id" pagination={{ pageSize: 10 }} />
    </Card>
  )
}
