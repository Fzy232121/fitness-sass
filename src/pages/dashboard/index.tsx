import { Row, Col, Card, Statistic, Table, Tag, Timeline, Progress } from 'antd'
import {
  TeamOutlined, DollarOutlined, LoginOutlined, ThunderboltOutlined,
  ClockCircleOutlined, RiseOutlined, WarningOutlined,
} from '@ant-design/icons'
import { useAuthStore } from '@/store'
import { mockMembers, mockOrders, mockCheckIns } from '@/mock'

export default function Dashboard() {
  const { userInfo } = useAuthStore()

  const todayRevenue = mockOrders.reduce((s, o) => s + o.actualPrice, 0)
  const todayCheckIns = mockCheckIns.length
  const totalMembers = mockMembers.length
  const normalMembers = mockMembers.filter((m) => m.status === 'normal').length
  const expiringMembers = mockMembers.filter((m) => m.status === 'expired').length
  const ptRemain = mockMembers.reduce((s, m) => s + m.ptRemain, 0)

  const recentOrders = mockOrders.slice(-5).reverse()

  const orderColumns = [
    { title: '订单号', dataIndex: 'orderNo', key: 'orderNo' },
    { title: '会员', dataIndex: 'memberName', key: 'memberName' },
    { title: '卡项', dataIndex: 'cardProductName', key: 'cardProductName' },
    { title: '金额', dataIndex: 'actualPrice', key: 'actualPrice', render: (v: number) => `¥${v.toLocaleString()}` },
    { title: '支付', dataIndex: 'payMethodLabel', key: 'payMethodLabel' },
    { title: '时间', dataIndex: 'createdAt', key: 'createdAt' },
  ]

  const statusColor: Record<string, string> = { normal: 'green', frozen: 'orange', expired: 'red', cancelled: 'default' }
  const statusLabel: Record<string, string> = { normal: '正常', frozen: '冻结', expired: '过期', cancelled: '作废' }

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>欢迎回来，{userInfo?.realName}</h2>
        <p style={{ color: '#999', margin: '4px 0 0' }}>
          {userInfo?.storeName || '全部门店'} · {userInfo?.roleLabel}
        </p>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic title="今日营收" value={todayRevenue} prefix={<DollarOutlined />} suffix="元" valueStyle={{ color: '#1890ff' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic title="今日进场" value={todayCheckIns} prefix={<LoginOutlined />} suffix="人" valueStyle={{ color: '#52c41a' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic title="总会员数" value={totalMembers} prefix={<TeamOutlined />} suffix="人" valueStyle={{ color: '#722ed1' }} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card hoverable>
            <Statistic title="待消私教课" value={ptRemain} prefix={<ThunderboltOutlined />} suffix="节" valueStyle={{ color: '#fa8c16' }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="最近订单" size="small">
            <Table columns={orderColumns} dataSource={recentOrders} rowKey="id" pagination={false} size="small" />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="会员状态分布" size="small">
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>正常会员</span><span>{normalMembers}/{totalMembers}</span>
              </div>
              <Progress percent={Math.round((normalMembers / totalMembers) * 100)} strokeColor="#52c41a" size="small" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span>过期会员</span><span>{expiringMembers}/{totalMembers}</span>
              </div>
              <Progress percent={Math.round((expiringMembers / totalMembers) * 100)} strokeColor="#ff4d4f" size="small" />
            </div>
            <div>
              <p style={{ fontWeight: 600, marginBottom: 8 }}>会员动态</p>
              <Timeline
                items={[
                  { color: 'green', children: '张小美 签到进场 - 10分钟前' },
                  { color: 'blue', children: '赵强 办理年卡 - 1小时前' },
                  { color: 'orange', children: '王淑芬 会员卡冻结 - 2小时前' },
                  { color: 'red', children: '李建国 会员卡过期 - 今天' },
                ]}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card size="small" hoverable>
            <Statistic title="即将到期会员" value={expiringMembers} prefix={<WarningOutlined />} suffix="人" valueStyle={{ color: '#ff4d4f' }} />
            <p style={{ color: '#999', fontSize: 12, marginTop: 8 }}>近30天即将到期</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card size="small" hoverable>
            <Statistic title="待上课时" value={ptRemain} prefix={<ClockCircleOutlined />} suffix="节" valueStyle={{ color: '#fa8c16' }} />
            <p style={{ color: '#999', fontSize: 12, marginTop: 8 }}>私教待消课</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card size="small" hoverable>
            <Statistic title="月新增会员" value={3} prefix={<RiseOutlined />} suffix="人" valueStyle={{ color: '#52c41a' }} />
            <p style={{ color: '#999', fontSize: 12, marginTop: 8 }}>本月新增</p>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
