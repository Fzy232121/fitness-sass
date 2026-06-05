import { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Layout, Menu, theme, Avatar, Dropdown, Breadcrumb, Tabs } from 'antd'
import type { MenuProps } from 'antd'
import {
  DashboardOutlined, SettingOutlined, ShopOutlined, TeamOutlined,
  CreditCardOutlined, UserOutlined, UsergroupOutlined, HeartOutlined,
  AccountBookOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
  LogoutOutlined, ProfileOutlined, LockOutlined,
} from '@ant-design/icons'
import { useAuthStore, useAppStore } from '@/store'
import { filterMenusByRole, menuConfig } from '@/router/menuConfig'
import type { UserRole } from '@/types'

const { Header, Sider, Content } = Layout

const iconMap: Record<string, React.ReactNode> = {
  DashboardOutlined: <DashboardOutlined />,
  SettingOutlined: <SettingOutlined />,
  ShopOutlined: <ShopOutlined />,
  TeamOutlined: <TeamOutlined />,
  CreditCardOutlined: <CreditCardOutlined />,
  UserOutlined: <UserOutlined />,
  UsergroupOutlined: <UsergroupOutlined />,
  HeartOutlined: <HeartOutlined />,
  AccountBookOutlined: <AccountBookOutlined />,
}

function buildAntdMenuItems(menus: ReturnType<typeof filterMenusByRole>): MenuProps['items'] {
  return menus.map((item) => ({
    key: item.key,
    icon: item.icon ? iconMap[item.icon] : undefined,
    label: item.label,
    children: item.children ? buildAntdMenuItems(item.children) : undefined,
  }))
}

function getBreadcrumb(pathname: string, menus: ReturnType<typeof filterMenusByRole>) {
  const crumbs: { title: string }[] = [{ title: '首页' }]
  for (const m of menus) {
    if (m.children) {
      for (const c of m.children) {
        if (c.key === pathname) {
          crumbs.push({ title: m.label }, { title: c.label })
          return crumbs
        }
      }
    } else if (m.key === pathname) {
      crumbs.push({ title: m.label })
      return crumbs
    }
  }
  return crumbs
}

export default function MainLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo, logout } = useAuthStore()
  const { collapsed, toggleCollapsed, openTabs, activeTabKey, addTab, removeTab, setActiveTab } = useAppStore()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([location.pathname])
  const [openKeys, setOpenKeys] = useState<string[]>([])
  const { token: themeToken } = theme.useToken()

  const role = userInfo?.role as UserRole
  const filteredMenus = filterMenusByRole(menuConfig, role)
  const menuItems = buildAntdMenuItems(filteredMenus)

  useEffect(() => {
    setSelectedKeys([location.pathname])
    const parent = filteredMenus.find((m) => m.children?.some((c) => c.key === location.pathname))
    if (parent) setOpenKeys([parent.key])
    const label = findLabel(location.pathname, filteredMenus)
    if (label) addTab({ key: location.pathname, label, path: location.pathname })
  }, [location.pathname])

  function findLabel(path: string, menus: ReturnType<typeof filterMenusByRole>): string {
    for (const m of menus) {
      if (m.key === path) return m.label
      if (m.children) {
        const found = findLabel(path, m.children)
        if (found) return found
      }
    }
    return ''
  }

  const onMenuClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', icon: <ProfileOutlined />, label: '个人中心', onClick: () => navigate('/profile') },
    { key: 'password', icon: <LockOutlined />, label: '修改密码', onClick: () => navigate('/profile/password') },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: '退出登录', danger: true, onClick: handleLogout },
  ]

  const onTabChange = (key: string) => {
    setActiveTab(key)
    navigate(key)
  }

  const onTabEdit = (targetKey: string | React.MouseEvent, action: 'add' | 'remove') => {
    if (action === 'remove' && typeof targetKey === 'string') {
      removeTab(targetKey)
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} width={220} style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <h1 style={{ color: '#fff', margin: 0, fontSize: collapsed ? 16 : 18, whiteSpace: 'nowrap' }}>
            {collapsed ? '运动' : '运动健身SaaS'}
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={(keys) => setOpenKeys(keys)}
          onClick={onMenuClick}
          items={menuItems}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 220, transition: 'margin-left 0.2s' }}>
        <Header style={{ padding: '0 24px', background: themeToken.colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span onClick={toggleCollapsed} style={{ fontSize: 18, cursor: 'pointer' }}>
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </span>
            <Breadcrumb items={getBreadcrumb(location.pathname, filteredMenus)} />
          </div>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar style={{ backgroundColor: themeToken.colorPrimary }}>{userInfo?.realName?.[0]}</Avatar>
              <span>{userInfo?.realName}</span>
              <span style={{ color: '#999', fontSize: 12 }}>({userInfo?.roleLabel})</span>
            </div>
          </Dropdown>
        </Header>
        <div style={{ padding: '4px 16px 0', background: themeToken.colorBgContainer, borderBottom: `1px solid ${themeToken.colorBorderSecondary}` }}>
          <Tabs
            type="editable-card"
            hideAdd
            activeKey={activeTabKey}
            onChange={onTabChange}
            onEdit={onTabEdit}
            items={openTabs.map((tab) => ({
              key: tab.key,
              label: tab.label,
              closable: tab.closable !== false,
            }))}
            size="small"
          />
        </div>
        <Content style={{ margin: 16, padding: 24, background: themeToken.colorBgContainer, borderRadius: themeToken.borderRadiusLG, minHeight: 280, overflow: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
