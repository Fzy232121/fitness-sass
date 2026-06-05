import { Card, Table, Tag, Input, Space, Button, Select } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { mockOperationLogs } from '@/mock'

export default function LogPage() {
  const [logs] = useState(mockOperationLogs)

  const columns = [
    { title: '操作人', dataIndex: 'userName', key: 'userName' },
    { title: '模块', dataIndex: 'module', key: 'module' },
    { title: '操作', dataIndex: 'action', key: 'action' },
    { title: '内容', dataIndex: 'content', key: 'content' },
    { title: 'IP', dataIndex: 'ip', key: 'ip' },
    { title: '状态', dataIndex: 'status', key: 'status', render: (v: number) => <Tag color={v === 1 ? 'green' : 'red'}>{v === 1 ? '成功' : '失败'}</Tag> },
    { title: '时间', dataIndex: 'createdAt', key: 'createdAt' },
  ]

  return (
    <Card title="操作日志" extra={<Button icon={<ExportOutlined />}>导出</Button>}>
      <Space style={{ marginBottom: 16 }}>
        <Input placeholder="操作人" allowClear style={{ width: 150 }} />
        <Select placeholder="操作模块" allowClear style={{ width: 150 }} options={[
          { label: '会员管理', value: '会员管理' }, { label: '卡项管理', value: '卡项管理' },
          { label: '系统管理', value: '系统管理' }, { label: '财务管理', value: '财务管理' },
        ]} />
      </Space>
      <Table columns={columns} dataSource={logs} rowKey="id" pagination={{ pageSize: 10 }} />
    </Card>
  )
}
