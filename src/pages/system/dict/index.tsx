import { Card, Table, Button, Tag, Space, Input, Modal, Form, Select, message, Popconfirm } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { mockDicts } from '@/mock'
import type { DictType, DictItem } from '@/types'

export default function DictPage() {
  const [dicts, setDicts] = useState<DictType[]>(mockDicts)
  const [modalOpen, setModalOpen] = useState(false)
  const [itemModalOpen, setItemModalOpen] = useState(false)
  const [editingDict, setEditingDict] = useState<DictType | null>(null)
  const [editingItem, setEditingItem] = useState<DictItem | null>(null)
  const [currentDictId, setCurrentDictId] = useState<number>(0)
  const [dictForm] = Form.useForm()
  const [itemForm] = Form.useForm()

  const dictColumns = [
    { title: '字典编码', dataIndex: 'code', key: 'code' },
    { title: '字典名称', dataIndex: 'name', key: 'name' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: number) => <Tag color={v === 1 ? 'green' : 'red'}>{v === 1 ? '启用' : '禁用'}</Tag> },
    { title: '字典项数', key: 'items', render: (_: unknown, r: DictType) => r.items.length },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '操作', key: 'action', render: (_: unknown, r: DictType) => (
        <Space>
          <Button size="small" type="link" onClick={() => { setCurrentDictId(r.id); setItemModalOpen(true); setEditingItem(null); itemForm.resetFields() }}>添加项</Button>
          <Button size="small" type="link" icon={<EditOutlined />} onClick={() => { setEditingDict(r); dictForm.setFieldsValue(r); setModalOpen(true) }}>编辑</Button>
          <Popconfirm title="确认删除？" onConfirm={() => setDicts(dicts.filter((d) => d.id !== r.id))}>
            <Button size="small" type="link" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const itemColumns = [
    { title: '标签', dataIndex: 'label', key: 'label' },
    { title: '值', dataIndex: 'value', key: 'value' },
    { title: '排序', dataIndex: 'sort', key: 'sort' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: number) => <Tag color={v === 1 ? 'green' : 'red'}>{v === 1 ? '启用' : '禁用'}</Tag> },
    {
      title: '操作', key: 'action', render: (_: unknown, r: DictItem) => (
        <Space>
          <Button size="small" type="link" icon={<EditOutlined />} onClick={() => { setEditingItem(r); itemForm.setFieldsValue(r); setItemModalOpen(true) }}>编辑</Button>
          <Popconfirm title="确认删除？" onConfirm={() => {
            setDicts(dicts.map((d) => d.id === r.dictTypeId ? { ...d, items: d.items.filter((i) => i.id !== r.id) } : d))
          }}>
            <Button size="small" type="link" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Card title="字典管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditingDict(null); dictForm.resetFields(); setModalOpen(true) }}>新增字典</Button>}>
        <Table columns={dictColumns} dataSource={dicts} rowKey="id" pagination={{ pageSize: 10 }} expandable={{
          expandedRowRender: (record: DictType) => (
            <Table columns={itemColumns} dataSource={record.items} rowKey="id" pagination={false} size="small" />
          ),
        }} />
      </Card>

      <Modal title={editingDict ? '编辑字典' : '新增字典'} open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => {
        dictForm.validateFields().then((values) => {
          if (editingDict) {
            setDicts(dicts.map((d) => d.id === editingDict.id ? { ...d, ...values } : d))
          } else {
            setDicts([...dicts, { ...values, id: Date.now(), items: [], createdAt: new Date().toISOString().slice(0, 10) }])
          }
          message.success('操作成功')
          setModalOpen(false)
        })
      }}>
        <Form form={dictForm} layout="vertical">
          <Form.Item label="字典编码" name="code" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="字典名称" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="描述" name="description"><Input /></Form.Item>
          <Form.Item label="状态" name="status" initialValue={1}><Select options={[{ label: '启用', value: 1 }, { label: '禁用', value: 0 }]} /></Form.Item>
        </Form>
      </Modal>

      <Modal title={editingItem ? '编辑字典项' : '新增字典项'} open={itemModalOpen} onCancel={() => setItemModalOpen(false)} onOk={() => {
        itemForm.validateFields().then((values) => {
          setDicts(dicts.map((d) => {
            if (d.id !== currentDictId) return d
            if (editingItem) {
              return { ...d, items: d.items.map((i) => i.id === editingItem.id ? { ...i, ...values } : i) }
            }
            return { ...d, items: [...d.items, { ...values, id: Date.now(), dictTypeId: currentDictId }] }
          }))
          message.success('操作成功')
          setItemModalOpen(false)
        })
      }}>
        <Form form={itemForm} layout="vertical">
          <Form.Item label="标签" name="label" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="值" name="value" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="排序" name="sort" initialValue={0}><Input type="number" /></Form.Item>
          <Form.Item label="状态" name="status" initialValue={1}><Select options={[{ label: '启用', value: 1 }, { label: '禁用', value: 0 }]} /></Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
