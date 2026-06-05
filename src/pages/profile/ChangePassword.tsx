import { Card, Form, Input, Button, message } from 'antd'
import { LockOutlined } from '@ant-design/icons'

export default function ChangePassword() {
  const onFinish = (values: { oldPassword: string; newPassword: string }) => {
    if (values.oldPassword !== '123456') {
      message.error('原密码错误')
      return
    }
    message.success('密码修改成功')
  }

  return (
    <Card title="修改密码" style={{ maxWidth: 500 }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="原密码" name="oldPassword" rules={[{ required: true, message: '请输入原密码' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="请输入原密码" />
        </Form.Item>
        <Form.Item label="新密码" name="newPassword" rules={[{ required: true, min: 6, message: '密码至少6位' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item label="确认新密码" dependencies={['newPassword']} rules={[{ required: true, message: '请确认新密码' }, ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('newPassword') === value) return Promise.resolve()
            return Promise.reject(new Error('两次密码不一致'))
          },
        })]} name="confirmPassword">
          <Input.Password prefix={<LockOutlined />} placeholder="请再次输入新密码" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">确认修改</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}
