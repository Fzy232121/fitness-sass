import { Card, Table, Button, Tag, Space, Modal, Form, Input, Select, Tree, message } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { mockUsers } from '@/mock'
import { menuConfig } from '@/router/menuConfig'
import type { UserRole } from '@/types'

interface Role {
  id: number
  name: string
  code: UserRole
  description: string
  menuKeys: string[]
  status: number
}

const initRoles: Role[] = [
  { id: 1, name: '超级管理员', code: 'super_admin', description: '拥有所有权限', menuKeys: menuConfig.flatMap((m) => [m.key, ...(m.children?.map((c) => c.key) || [])]), status: 1 },
  { id: 2, name: '门店店长', code: 'store_manager', description: '门店管理权限', menuKeys: ['/dashboard', '/system/user', '/system/log', '/store', '/store/employee', '/store/coach', '/store/schedule', '/member', '/member/list', '/member/leads', '/card', '/card/product', '/card/sale', '/card/renew'], status: 1 },
  { id: 3, name: '前台收银', code: 'receptionist', description: '前台收银权限', menuKeys: ['/dashboard', '/member', '/member/list', '/card/sale', '/card/renew'], status: 1 },
  { id: 4, name: '私教教练', code: 'pt_coach', description: '私教教练权限', menuKeys: ['/dashboard', '/member/list', '/pt/schedule', '/pt/consume', '/health/plan'], status: 1 },
  { id: 5, name: '财务', code: 'finance', description: '财务权限', menuKeys: ['/dashboard', '/finance', '/finance/order', '/finance/refund', '/finance/revenue', '/finance/salary'], status: 1 },
]

const treeData = menuConfig.map((m) => ({
  title: m.label,
  key: m.key,
  children: m.children?.map((c) => ({ title: c.label, key: c.key })),
}))

export default function RolePage() {
  const [roles, setRoles] = useState<Role[]>(initRoles)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Role | null>(null)
  const [checkedKeys, setCheckedKeys] = useState<string[]>([])
  const [form] = Form.useForm()

  const columns = [
    { title: '角色名称', dataIndex: 'name', key: 'name' },
    { title: '角色编码', dataIndex: 'code', key: 'code' },
    { title: '描述', dataIndex: 'description', key: 'description' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: number) => <Tag color={v === 1 ? 'green' : 'red'}>{v === 1 ? '启用' : '禁用'}</Tag> },
    { title: '菜单权限数', key: 'menuCount', render: (_: unknown, r: Role) => r.menuKeys.length },
    {
      title: '操作', key: 'action', render: (_: unknown, r: Role) => (
        <Space>
          <Button size="small" type="link" icon={<EditOutlined />} onClick={() => {
            setEditing(r); form.setFieldsValue(r); setCheckedKeys(r.menuKeys); setModalOpen(true)
          }}>编辑</Button>
        </Space>
      ),
    },
  ]

  return (
    <Card title="角色权限管理" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => { setEditing(null); form.resetFields(); setCheckedKeys([]); setModalOpen(true) }}>新增角色</Button>}>
      <Table columns={columns} dataSource={roles} rowKey="id" pagination={{ pageSize: 10 }} />
      <Modal title={editing ? '编辑角色' : '新增角色'} open={modalOpen} onCancel={() => setModalOpen(false)} width={600} onOk={() => {
        form.validateFields().then((values) => {
          if (editing) {
            setRoles(roles.map((r) => r.id === editing.id ? { ...r, ...values, menuKeys: checkedKeys } : r))
          } else {
            setRoles([...roles, { ...values, id: Date.now(), menuKeys: checkedKeys }])
          }
          message.success('操作成功')
          setModalOpen(false)
        })
      }}>
        <Form form={form} layout="vertical">
          <Form.Item label="角色名称" name="name" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="角色编码" name="code" rules={[{ required: true }]}><Select options={[
            { label: '超级管理员', value: 'super_admin' }, { label: '门店店长', value: 'store_manager' },
            { label: '前台收银', value: 'receptionist' }, { label: '私教教练', value: 'pt_coach' },
            { label: '团课老师', value: 'group_coach' }, { label: '财务', value: 'finance' },
            { label: '运营', value: 'operator' },
          ]} /></Form.Item>
          <Form.Item label="描述" name="description"><Input /></Form.Item>
          <Form.Item label="菜单权限">
            <Tree checkable checkedKeys={checkedKeys} onCheck={(keys) => setCheckedKeys(keys as string[])} treeData={treeData} />
          </Form.Item>
          <Form.Item label="状态" name="status" initialValue={1}><Select options={[{ label: '启用', value: 1 }, { label: '禁用', value: 0 }]} /></Form.Item>
        </Form>
      </Modal>
    </Card>
  )
}
