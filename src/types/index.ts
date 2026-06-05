// 用户角色
export type UserRole = 'super_admin' | 'store_manager' | 'receptionist' | 'pt_coach' | 'group_coach' | 'finance' | 'operator'

// 用户信息
export interface UserInfo {
  id: number
  username: string
  realName: string
  avatar?: string
  role: UserRole
  roleLabel: string
  storeId?: number
  storeName?: string
  phone: string
  status: 0 | 1
  createdAt: string
}

// 会员状态
export type MemberStatus = 'normal' | 'frozen' | 'expired' | 'cancelled'

// 卡类型
export type CardType = 'time' | 'count' | 'pt' | 'stored' | 'special'

// 支付方式
export type PayMethod = 'wechat' | 'alipay' | 'cash' | 'transfer' | 'debt'

// 会员信息
export interface Member {
  id: number
  memberNo: string
  name: string
  phone: string
  gender: 'male' | 'female'
  birthday?: string
  height?: number
  weight?: number
  avatar?: string
  joinDate: string
  source: string
  emergencyContact?: string
  emergencyPhone?: string
  status: MemberStatus
  tags: string[]
  storeId: number
  storeName: string
  cards: MemberCard[]
  ptRemain: number
  balance: number
  createdAt: string
}

// 会员卡
export interface MemberCard {
  id: number
  memberId: number
  cardName: string
  cardType: CardType
  startDate: string
  endDate: string
  remainCount?: number
  totalCount?: number
  status: 'normal' | 'frozen' | 'stopped' | 'expired'
  frozenReason?: string
  stopCount: number
  maxStopCount: number
}

// 卡种产品
export interface CardProduct {
  id: number
  name: string
  type: CardType
  typeLabel: string
  price: number
  originalPrice: number
  validDays?: number
  totalCount?: number
  giftDays?: number
  giftCount?: number
  maxStopCount: number
  storeIds: number[]
  status: 0 | 1
  description?: string
  createdAt: string
}

// 订单
export interface Order {
  id: number
  orderNo: string
  memberId: number
  memberName: string
  memberPhone: string
  cardProductId: number
  cardProductName: string
  originalPrice: number
  actualPrice: number
  discount: number
  payMethod: PayMethod
  payMethodLabel: string
  handlerId: number
  handlerName: string
  storeId: number
  storeName: string
  status: 'paid' | 'refunded' | 'cancelled'
  remark?: string
  createdAt: string
}

// 签到记录
export interface CheckInRecord {
  id: number
  memberId: number
  memberName: string
  memberPhone: string
  checkInTime: string
  checkOutTime?: string
  type: 'card' | 'face' | 'phone'
  storeId: number
  storeName: string
}

// 字典
export interface DictType {
  id: number
  code: string
  name: string
  description?: string
  status: 0 | 1
  createdAt: string
  items: DictItem[]
}

export interface DictItem {
  id: number
  dictTypeId: number
  label: string
  value: string
  sort: number
  status: 0 | 1
  remark?: string
}

// 跟进记录
export interface FollowRecord {
  id: number
  memberId: number
  content: string
  followerId: number
  followerName: string
  followType: 'call' | 'visit' | 'wechat' | 'other'
  createdAt: string
}

// 线索
export interface Lead {
  id: number
  name: string
  phone: string
  gender?: 'male' | 'female'
  source: string
  status: 'new' | 'following' | 'trial' | 'converted' | 'lost'
  statusLabel: string
  assignedTo?: number
  assignedName?: string
  lastFollowTime?: string
  followCount: number
  remark?: string
  storeId: number
  storeName: string
  createdAt: string
}

// 操作日志
export interface OperationLog {
  id: number
  userId: number
  userName: string
  module: string
  action: string
  content: string
  ip: string
  status: 0 | 1
  createdAt: string
}

// 门店
export interface Store {
  id: number
  name: string
  address: string
  phone: string
  businessHours: string
  status: 0 | 1
  createdAt: string
}

// 分页
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// 路由Meta
export interface RouteMeta {
  title: string
  icon?: string
  roles?: UserRole[]
  hideInMenu?: boolean
  hideInBreadcrumb?: boolean
}
