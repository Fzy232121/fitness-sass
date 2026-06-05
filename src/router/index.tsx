import { createBrowserRouter, Navigate } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Login from '@/pages/login'
import Dashboard from '@/pages/dashboard'
import Profile from '@/pages/profile'
import ChangePassword from '@/pages/profile/ChangePassword'
import DictPage from '@/pages/system/dict'
import RolePage from '@/pages/system/role'
import UserPage from '@/pages/system/user'
import ConfigPage from '@/pages/system/config'
import LogPage from '@/pages/system/log'
import StoreList from '@/pages/store/StoreList'
import EmployeeList from '@/pages/store/EmployeeList'
import CoachList from '@/pages/store/CoachList'
import SchedulePage from '@/pages/store/SchedulePage'
import MemberList from '@/pages/member/MemberList'
import MemberDetail from '@/pages/member/MemberDetail'
import LeadsPage from '@/pages/member/LeadsPage'
import TagsPage from '@/pages/member/TagsPage'
import CardProduct from '@/pages/card/CardProduct'
import CardSale from '@/pages/card/CardSale'
import CardRenew from '@/pages/card/CardRenew'
import CouponPage from '@/pages/card/CouponPage'
import PtProject from '@/pages/pt/PtProject'
import PtPurchase from '@/pages/pt/PtPurchase'
import PtSchedule from '@/pages/pt/PtSchedule'
import PtConsume from '@/pages/pt/PtConsume'
import PtPerformance from '@/pages/pt/PtPerformance'
import GroupCourse from '@/pages/group/GroupCourse'
import GroupSchedule from '@/pages/group/GroupSchedule'
import GroupReservation from '@/pages/group/GroupReservation'
import GroupAttendance from '@/pages/group/GroupAttendance'
import BodyTest from '@/pages/health/BodyTest'
import HealthPlan from '@/pages/health/HealthPlan'
import FollowUp from '@/pages/health/FollowUp'
import OrderList from '@/pages/finance/OrderList'
import RefundPage from '@/pages/finance/RefundPage'
import RevenuePage from '@/pages/finance/RevenuePage'
import SalaryPage from '@/pages/finance/SalaryPage'
import ExportPage from '@/pages/finance/ExportPage'
import AuthGuard from '@/router/AuthGuard'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <AuthGuard><MainLayout /></AuthGuard>,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'profile/password', element: <ChangePassword /> },
      // 系统管理
      { path: 'system/dict', element: <DictPage /> },
      { path: 'system/role', element: <RolePage /> },
      { path: 'system/user', element: <UserPage /> },
      { path: 'system/config', element: <ConfigPage /> },
      { path: 'system/log', element: <LogPage /> },
      // 门店人事
      { path: 'store/list', element: <StoreList /> },
      { path: 'store/employee', element: <EmployeeList /> },
      { path: 'store/coach', element: <CoachList /> },
      { path: 'store/schedule', element: <SchedulePage /> },
      // 会员管理
      { path: 'member/list', element: <MemberList /> },
      { path: 'member/detail/:id', element: <MemberDetail /> },
      { path: 'member/leads', element: <LeadsPage /> },
      { path: 'member/tags', element: <TagsPage /> },
      // 产品卡项
      { path: 'card/product', element: <CardProduct /> },
      { path: 'card/sale', element: <CardSale /> },
      { path: 'card/renew', element: <CardRenew /> },
      { path: 'card/coupon', element: <CouponPage /> },
      // 私教业务
      { path: 'pt/project', element: <PtProject /> },
      { path: 'pt/purchase', element: <PtPurchase /> },
      { path: 'pt/schedule', element: <PtSchedule /> },
      { path: 'pt/consume', element: <PtConsume /> },
      { path: 'pt/performance', element: <PtPerformance /> },
      // 团课业务
      { path: 'group/course', element: <GroupCourse /> },
      { path: 'group/schedule', element: <GroupSchedule /> },
      { path: 'group/reservation', element: <GroupReservation /> },
      { path: 'group/attendance', element: <GroupAttendance /> },
      // 健身档案
      { path: 'health/body-test', element: <BodyTest /> },
      { path: 'health/plan', element: <HealthPlan /> },
      { path: 'health/follow-up', element: <FollowUp /> },
      // 财务数据
      { path: 'finance/order', element: <OrderList /> },
      { path: 'finance/refund', element: <RefundPage /> },
      { path: 'finance/revenue', element: <RevenuePage /> },
      { path: 'finance/salary', element: <SalaryPage /> },
      { path: 'finance/export', element: <ExportPage /> },
    ],
  },
  { path: '*', element: <Navigate to="/dashboard" replace /> },
])

export default router
