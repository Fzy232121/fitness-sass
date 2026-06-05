import { Card, Form, Switch, InputNumber, Input, Button, Divider, message } from 'antd'

export default function ConfigPage() {
  const onFinish = (values: any) => {
    message.success('配置保存成功')
  }

  return (
    <Card title="系统参数配置">
      <Form layout="vertical" onFinish={onFinish} initialValues={{
        autoFreeze: true, cancelHours: 2, noShowLimit: 3,
        lateMinutes: 15, doorAccess: true, printTemplate: 'default',
      }} style={{ maxWidth: 600 }}>
        <Divider orientation="left">会员规则</Divider>
        <Form.Item label="过期自动冻结" name="autoFreeze" valuePropName="checked"><Switch /></Form.Item>
        <Form.Item label="预约取消时限（小时前）" name="cancelHours"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
        <Form.Item label="爽约次数限制" name="noShowLimit"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>

        <Divider orientation="left">门禁规则</Divider>
        <Form.Item label="启用门禁权限控制" name="doorAccess" valuePropName="checked"><Switch /></Form.Item>
        <Form.Item label="上课迟到超时（分钟）" name="lateMinutes"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>

        <Divider orientation="left">打印模板</Divider>
        <Form.Item label="小票打印模板" name="printTemplate"><Input /></Form.Item>

        <Form.Item><Button type="primary" htmlType="submit">保存配置</Button></Form.Item>
      </Form>
    </Card>
  )
}
