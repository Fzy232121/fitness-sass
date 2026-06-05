import type { UserRole } from '@/types'

export interface MenuItem {
  key: string
  label: string
  icon?: string
  children?: MenuItem[]
  roles?: UserRole[]
  hideInMenu?: boolean
}

export const menuConfig: MenuItem[] = [
  {
    key: '/dashboard',
    label: '首页大屏',
    icon: 'DashboardOutlined',
  },
  {
    key: '/system',
    label: '系统管理',
    icon: 'SettingOutlined',
    roles: ['super_admin', 'store_manager'],
    children: [
      { key: '/system/dict', label: '字典管理', roles: ['super_admin'] },
      { key: '/system/role', label: '角色权限', roles: ['super_admin'] },
      { key: '/system/user', label: '用户管理', roles: ['super_admin', 'store_manager'] },
      { key: '/system/config', label: '系统配置', roles: ['super_admin'] },
      { key: '/system/log', label: '操作日志', roles: ['super_admin', 'store_manager'] },
    ],
  },
  {
    key: '/store',
    label: '门店人事',
    icon: 'ShopOutlined',
    roles: ['super_admin', 'store_manager'],
    children: [
      { key: '/store/list', label: '门店管理', roles: ['super_admin'] },
      { key: '/store/employee', label: '员工管理' },
      { key: '/store/coach', label: '教练资质' },
      { key: '/store/schedule', label: '排班管理' },
    ],
  },
  {
    key: '/member',
    label: '会员管理',
    icon: 'TeamOutlined',
    children: [
      { key: '/member/list', label: '会员列表' },
      { key: '/member/leads', label: '潜在客户', roles: ['super_admin', 'store_manager', 'receptionist', 'operator'] },
      { key: '/member/tags', label: '会员标签', roles: ['super_admin', 'store_manager', 'operator'] },
    ],
  },
  {
    key: '/card',
    label: '产品卡项',
    icon: 'CreditCardOutlined',
    children: [
      { key: '/card/product', label: '卡种管理', roles: ['super_admin', 'store_manager'] },
      { key: '/card/sale', label: '售卡开单', roles: ['super_admin', 'store_manager', 'receptionist'] },
      { key: '/card/renew', label: '续费升级', roles: ['super_admin', 'store_manager', 'receptionist'] },
      { key: '/card/coupon', label: '活动优惠券', roles: ['super_admin', 'store_manager', 'operator'] },
    ],
  },
  {
    key: '/pt',
    label: '私教业务',
    icon: 'UserOutlined',
    children: [
      { key: '/pt/project', label: '私教项目库', roles: ['super_admin', 'store_manager'] },
      { key: '/pt/purchase', label: '私教购课', roles: ['super_admin', 'store_manager', 'receptionist'] },
      { key: '/pt/schedule', label: '私教排课', roles: ['super_admin', 'store_manager', 'pt_coach'] },
      { key: '/pt/consume', label: '消课记录' },
      { key: '/pt/performance', label: '私教绩效', roles: ['super_admin', 'store_manager', 'finance'] },
    ],
  },
  {
    key: '/group',
    label: '团课业务',
    icon: 'UsergroupOutlined',
    children: [
      { key: '/group/course', label: '团课课程库', roles: ['super_admin', 'store_manager'] },
      { key: '/group/schedule', label: '团课排课' },
      { key: '/group/reservation', label: '预约列表' },
      { key: '/group/attendance', label: '上课点名', roles: ['super_admin', 'store_manager', 'group_coach'] },
    ],
  },
  {
    key: '/health',
    label: '健身档案',
    icon: 'HeartOutlined',
    children: [
      { key: '/health/body-test', label: '体测记录' },
      { key: '/health/plan', label: '健身计划', roles: ['super_admin', 'store_manager', 'pt_coach'] },
      { key: '/health/follow-up', label: '客户回访跟进' },
    ],
  },
  {
    key: '/finance',
    label: '财务数据',
    icon: 'AccountBookOutlined',
    roles: ['super_admin', 'store_manager', 'finance'],
    children: [
      { key: '/finance/order', label: '订单列表' },
      { key: '/finance/refund', label: '退款管理', roles: ['super_admin', 'store_manager', 'finance'] },
      { key: '/finance/revenue', label: '营收报表' },
      { key: '/finance/salary', label: '员工工资绩效' },
      { key: '/finance/export', label: '数据统计导出' },
    ],
  },
]

export const roleLabels: Record<UserRole, string> = {
  super_admin: '超级管理员',
  store_manager: '门店店长',
  receptionist: '前台收银',
  pt_coach: '私教教练',
  group_coach: '团课老师',
  finance: '财务',
  operator: '运营',
}

export function filterMenusByRole(menus: MenuItem[], role: UserRole): MenuItem[] {
  return menus
    .filter((item) => !item.roles || item.roles.includes(role))
    .map((item) => {
      if (item.children) {
        const children = filterMenusByRole(item.children, role)
        return children.length > 0 ? { ...item, children } : null
      }
      return item
    })
    .filter(Boolean) as MenuItem[]
}
