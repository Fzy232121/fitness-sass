import { Card, Table, Tag, Button, Space, Modal, Form, Input, Select, message, Popconfirm } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { mockUsers, mockStores } from '@/mock'

export default function EmployeeList() {
  const [employees, setEmployees] = useState(mockUsers)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<typeof employees[0] | null>(null)
  const [form] = Form.useForm()

  const columns = [
    { title: '姓名', dataIndex: 'realName', key: 'realName' },
    { title: '手机号', dataIndex: 'phone', key: 'phone' },
    { title: '角色', dataIndex: 'roleLabel', key: 'roleLabel', render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: '门店', dataIndex: 'storeName', key: 'storeName', render: (v: string) => v || '全部门店' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: number) => <Tag color={v === 1 ? 'green' : 'red'}>{v === 1 ? '在职' : '离职'}</Tag> },
    { title: '入职时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '操作', key: 'action', render: (_: unknown, r: any) => (
        <Space>
          <Button size="small" type="link" icon={<EditOutlined />} onClick={() => { setEditing(r); form.setFieldsValue(r); setModalOpen(true) }}>编辑</Button>
          <Popconfirm title="确认删除？" onConfirm={() => setEmployees(employees.filter((e) => e.id !== r.id))}>
            <Button size="small" type="link" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Card title="员工管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true) }}>新增员工</Button>}>
      <Table columns={columns} dataSource={employees} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal title={editing ? '编辑员工' : '新增员工'} open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => {
        form.validateFields().then((values) => {
          if (editing) {
            setEmployees(employees.map((e) => e.id === editing.id ? { ...e, ...values } : e))
          } else {
            setEmployees([...employees, { ...values, id: Date.now(), status: 1, createdAt: new Date().toISOString().slice(0, 10) }])
          }
          message.success('操作成功'); setModalOpen(false)
        })
      }}>
        <Form form={form} layout="vertical">
          <Form.Item label="姓名" name="realName" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="手机号" name="phone" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="角色" name="role" rules={[{ required: true }]}>
            <Select options={[{ label: '门店店长', value: 'store_manager' }, { label: '前台收银', value: 'receptionist' }, { label: '私教教练', value: 'pt_coach' }, { label: '团课老师', value: 'group_coach' }]} />
          </Form.Item>
          <Form.Item label="门店" name="storeId">
            <Select options={mockStores.map((s) => ({ label: s.name, value: s.id }))} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
