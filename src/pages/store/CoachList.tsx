import { Card, Table, Tag, Button, Space, Modal, Form, Input, message } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { useState } from 'react'

const initCoaches = [
  { id: 1, name: '陈教练', specialty: '增肌/减脂/体态矫正', cert: 'ACE-CPT/NASM-CPT', intro: '8年私教经验，擅长增肌减脂', phone: '13800000004', status: 1 },
  { id: 2, name: '刘教练', specialty: '瑜伽/普拉提', cert: 'RYT-500', intro: '资深瑜伽导师', phone: '13800000006', status: 1 },
  { id: 3, name: '张教练', specialty: '搏击/格斗', cert: 'CBBA', intro: '搏击专项教练', phone: '13800000007', status: 1 },
]

export default function CoachList() {
  const [coaches, setCoaches] = useState(initCoaches)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<typeof coaches[0] | null>(null)
  const [form] = Form.useForm()

  const columns = [
    { title: '教练姓名', dataIndex: 'name', key: 'name' },
    { title: '擅长项目', dataIndex: 'specialty', key: 'specialty' },
    { title: '资质证书', dataIndex: 'cert', key: 'cert' },
    { title: '个人简介', dataIndex: 'intro', key: 'intro', ellipsis: true },
    { title: '手机', dataIndex: 'phone', key: 'phone' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: number) => <Tag color={v === 1 ? 'green' : 'red'}>{v === 1 ? '在职' : '离职'}</Tag> },
    { title: '操作', key: 'action', render: (_: unknown, r: any) => <Button size="small" type="link" icon={<EditOutlined />} onClick={() => { setEditing(r); form.setFieldsValue(r); setModalOpen(true) }}>编辑</Button> },
  ]

  return (
    <Card title="教练资质管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true) }}>新增教练</Button>}>
      <Table columns={columns} dataSource={coaches} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal title={editing ? '编辑教练' : '新增教练'} open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => {
        form.validateFields().then((values) => {
          if (editing) setCoaches(coaches.map((c) => c.id === editing.id ? { ...c, ...values } : c))
          else setCoaches([...coaches, { ...values, id: Date.now(), status: 1 }])
          message.success('操作成功'); setModalOpen(false)
        })
      }}>
        <Form form={form} layout="vertical">
          <Form.Item label="姓名" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="擅长项目" name="specialty"><Input placeholder="如：增肌/减脂/体态矫正" /></Form.Item>
          <Form.Item label="资质证书" name="cert"><Input /></Form.Item>
          <Form.Item label="个人简介" name="intro"><Input.TextArea rows={3} /></Form.Item>
          <Form.Item label="手机号" name="phone"><Input /></Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
