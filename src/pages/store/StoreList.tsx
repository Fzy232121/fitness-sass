import { Card, Table, Button, Tag, Space, Modal, Form, Input, Select, message, Popconfirm } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { mockStores } from '@/mock'
import type { Store } from '@/types'

export default function StoreList() {
  const [stores, setStores] = useState<Store[]>(mockStores)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Store | null>(null)
  const [form] = Form.useForm()

  const columns = [
    { title: '门店名称', dataIndex: 'name', key: 'name' },
    { title: '地址', dataIndex: 'address', key: 'address' },
    { title: '电话', dataIndex: 'phone', key: 'phone' },
    { title: '营业时间', dataIndex: 'businessHours', key: 'businessHours' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: number) => <Tag color={v === 1 ? 'green' : 'red'}>{v === 1 ? '营业中' : '已关闭'}</Tag> },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '操作', key: 'action', render: (_: unknown, r: Store) => (
        <Space>
          <Button size="small" type="link" icon={<EditOutlined />} onClick={() => { setEditing(r); form.setFieldsValue(r); setModalOpen(true) }}>编辑</Button>
          <Popconfirm title="确认删除？" onConfirm={() => setStores(stores.filter((s) => s.id !== r.id))}>
            <Button size="small" type="link" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Card title="门店管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true) }}>新增门店</Button>}>
      <Table columns={columns} dataSource={stores} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal title={editing ? '编辑门店' : '新增门店'} open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => {
        form.validateFields().then((values) => {
          if (editing) {
            setStores(stores.map((s) => s.id === editing.id ? { ...s, ...values } : s))
          } else {
            setStores([...stores, { ...values, id: Date.now(), createdAt: new Date().toISOString().slice(0, 10) }])
          }
          message.success('操作成功'); setModalOpen(false)
        })
      }}>
        <Form form={form} layout="vertical">
          <Form.Item label="门店名称" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="地址" name="address" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="电话" name="phone"><Input /></Form.Item>
          <Form.Item label="营业时间" name="businessHours"><Input placeholder="如: 06:00-23:00" /></Form.Item>
          <Form.Item label="状态" name="status" initialValue={1}><Select options={[{ label: '营业中', value: 1 }, { label: '已关闭', value: 0 }]} /></Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
