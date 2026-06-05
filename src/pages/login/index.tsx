import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Card, message, Select, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { useAuthStore } from '@/store'
import { loginAccounts, mockUsers } from '@/mock'
import type { UserRole } from '@/types'

const roleOptions = [
  { label: '超级管理员', value: 'admin' },
  { label: '门店店长', value: 'manager' },
  { label: '前台收银', value: 'reception' },
  { label: '私教教练', value: 'coach_pt' },
  { label: '财务', value: 'finance' },
]

export default function Login() {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const onFinish = (values: { username: string; password: string; remember: boolean }) => {
    setLoading(true)
    setTimeout(() => {
      const account = loginAccounts[values.username]
      if (!account || account.password !== values.password) {
        message.error('用户名或密码错误')
        setLoading(false)
        return
      }
      const userInfo = mockUsers.find((u) => u.id === account.userId)
      if (!userInfo) {
        message.error('用户信息异常')
        setLoading(false)
        return
      }
      login(`mock-token-${userInfo.id}`, userInfo)
      message.success(`欢迎回来，${userInfo.realName}！`)
      navigate('/dashboard')
      setLoading(false)
    }, 800)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Card style={{ width: 420, boxShadow: '0 8px 40px rgba(0,0,0,0.12)', borderRadius: 12 }} styles={{ body: { padding: '40px 32px' } }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#1890ff', marginBottom: 4 }}>运动健身</h1>
          <p style={{ color: '#999', margin: 0 }}>SaaS后台管理系统</p>
        </div>
        <Form name="login" onFinish={onFinish} initialValues={{ username: 'admin', password: '123456', remember: true }} size="large">
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input prefix={<UserOutlined />} placeholder="用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="密码" />
          </Form.Item>
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
            </div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block style={{ height: 44, fontSize: 16 }}>
              登 录
            </Button>
          </Form.Item>
        </Form>
        <div style={{ marginTop: 16 }}>
          <p style={{ color: '#999', fontSize: 12, marginBottom: 8 }}>快捷登录（点击自动填充）：</p>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {roleOptions.map((opt) => (
              <Button key={opt.value} size="small" type="dashed" onClick={() => {
                const form = document.querySelector('.ant-form') as any
                const inputs = form?.querySelectorAll('input')
                if (inputs?.[0]) (inputs[0] as HTMLInputElement).value = opt.value
                if (inputs?.[1]) (inputs[1] as HTMLInputElement).value = '123456'
              }}>
                {opt.label}
              </Button>
            ))}
          </div>
          <p style={{ color: '#bbb', fontSize: 11, marginTop: 8 }}>默认密码：123456</p>
        </div>
      </Card>
    </div>
  )
}
