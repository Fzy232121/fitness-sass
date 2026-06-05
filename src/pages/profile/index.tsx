import { Card, Descriptions, Avatar, Tag } from 'antd'
import { useAuthStore } from '@/store'

export default function Profile() {
  const { userInfo } = useAuthStore()

  return (
    <div>
      <Card title="个人信息">
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
          <Avatar size={80} style={{ fontSize: 32, backgroundColor: '#1890ff' }}>{userInfo?.realName?.[0]}</Avatar>
          <div>
            <h2 style={{ margin: 0 }}>{userInfo?.realName}</h2>
            <Tag color="blue">{userInfo?.roleLabel}</Tag>
          </div>
        </div>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="用户名">{userInfo?.username}</Descriptions.Item>
          <Descriptions.Item label="姓名">{userInfo?.realName}</Descriptions.Item>
          <Descriptions.Item label="手机号">{userInfo?.phone}</Descriptions.Item>
          <Descriptions.Item label="角色">{userInfo?.roleLabel}</Descriptions.Item>
          <Descriptions.Item label="所属门店">{userInfo?.storeName || '全部门店'}</Descriptions.Item>
          <Descriptions.Item label="账号状态">
            <Tag color={userInfo?.status === 1 ? 'green' : 'red'}>{userInfo?.status === 1 ? '正常' : '禁用'}</Tag>
          </Descriptions.Item>
          <Descriptions.Item label="创建时间">{userInfo?.createdAt}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  )
}
