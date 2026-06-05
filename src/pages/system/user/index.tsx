import { Card, Table, Button, Tag, Space, Modal, Form, Input, Select, message, Popconfirm, Switch } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { mockUsers } from '@/mock'
import type { UserInfo, UserRole } from '@/types'

export default function UserPage() {
  const [users, setUsers] = useState<UserInfo[]>(mockUsers)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<UserInfo | null>(null)
  const [form] = Form.useForm()

  const columns = [
    { title: '用户名', dataIndex: 'username', key: 'username' },
    { title: '姓名', dataIndex: 'realName', key: 'realName' },
    { title: '手机号', dataIndex: 'phone', key: 'phone' },
    { title: '角色', dataIndex: 'roleLabel', key: 'roleLabel', render: (v: string) => <Tag color="blue">{v}</Tag> },
    { title: '门店', dataIndex: 'storeName', key: 'storeName', render: (v: string) => v || '全部门店' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: number) => <Tag color={v === 1 ? 'green' : 'red'}>{v === 1 ? '正常' : '禁用'}</Tag> },
    { title: '创建时间', dataIndex: 'createdAt', key: 'createdAt' },
    {
      title: '操作', key: 'action', render: (_: unknown, r: UserInfo) => (
        <Space>
          <Button size="small" type="link" icon={<EditOutlined />} onClick={() => { setEditing(r); form.setFieldsValue(r); setModalOpen(true) }}>编辑</Button>
          <Button size="small" type="link" danger onClick={() => message.success('已重置密码为123456')}>重置密码</Button>
          <Popconfirm title="确认删除？" onConfirm={() => setUsers(users.filter((u) => u.id !== r.id))}>
            <Button size="small" type="link" danger icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <Card title="用户管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setModalOpen(true) }}>新增用户</Button>}>
      <Table columns={columns} dataSource={users} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal title={editing ? '编辑用户' : '新增用户'} open={modalOpen} onCancel={() => setModalOpen(false)} onOk={() => {
        form.validateFields().then((values) => {
          if (editing) {
            setUsers(users.map((u) => u.id === editing.id ? { ...u, ...values } : u))
          } else {
            setUsers([...users, { ...values, id: Date.now(), status: 1, createdAt: new Date().toISOString().slice(0, 10) }])
          }
          message.success('操作成功')
          setModalOpen(false)
        })
      }}>
        <Form form={form} layout="vertical">
          <Form.Item label="用户名" name="username" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="姓名" name="realName" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="手机号" name="phone" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="角色" name="role" rules={[{ required: true }]}>
            <Select options={[
              { label: '超级管理员', value: 'super_admin' }, { label: '门店店长', value: 'store_manager' },
              { label: '前台收银', value: 'receptionist' }, { label: '私教教练', value: 'pt_coach' },
              { label: '团课老师', value: 'group_coach' }, { label: '财务', value: 'finance' },
              { label: '运营', value: 'operator' },
            ]} />
          </Form.Item>
          {!editing && <Form.Item label="密码" name="password" rules={[{ required: true, min: 6 }]}><Input.Password /></Form.Item>}
        </Form>
      </Modal>
    </Card>
  )
}
