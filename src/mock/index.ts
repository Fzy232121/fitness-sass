import type { UserInfo, Member, MemberCard, CardProduct, Order, CheckInRecord, DictType, FollowRecord, Lead, OperationLog, Store } from '@/types'

// ===== 门店数据 =====
export const mockStores: Store[] = [
  { id: 1, name: '总部旗舰店', address: '北京市朝阳区建国路88号', phone: '010-88888888', businessHours: '06:00-23:00', status: 1, createdAt: '2023-01-01' },
  { id: 2, name: '望京店', address: '北京市朝阳区望京SOHO', phone: '010-66666666', businessHours: '07:00-22:00', status: 1, createdAt: '2023-03-01' },
  { id: 3, name: '中关村店', address: '北京市海淀区中关村大街1号', phone: '010-77777777', businessHours: '07:00-22:00', status: 1, createdAt: '2023-06-01' },
]

// ===== 用户数据 =====
export const mockUsers: UserInfo[] = [
  { id: 1, username: 'admin', realName: '张超级', role: 'super_admin', roleLabel: '超级管理员', phone: '13800000001', status: 1, createdAt: '2023-01-01' },
  { id: 2, username: 'manager', realName: '李店长', role: 'store_manager', roleLabel: '门店店长', storeId: 1, storeName: '总部旗舰店', phone: '13800000002', status: 1, createdAt: '2023-01-15' },
  { id: 3, username: 'reception', realName: '王前台', role: 'receptionist', roleLabel: '前台收银', storeId: 1, storeName: '总部旗舰店', phone: '13800000003', status: 1, createdAt: '2023-02-01' },
  { id: 4, username: 'coach_pt', realName: '陈教练', role: 'pt_coach', roleLabel: '私教教练', storeId: 1, storeName: '总部旗舰店', phone: '13800000004', status: 1, createdAt: '2023-02-15' },
  { id: 5, username: 'finance', realName: '刘财务', role: 'finance', roleLabel: '财务', storeId: 1, storeName: '总部旗舰店', phone: '13800000005', status: 1, createdAt: '2023-03-01' },
]

// 登录账户映射
export const loginAccounts: Record<string, { password: string; userId: number }> = {
  admin: { password: '123456', userId: 1 },
  manager: { password: '123456', userId: 2 },
  reception: { password: '123456', userId: 3 },
  coach_pt: { password: '123456', userId: 4 },
  finance: { password: '123456', userId: 5 },
}

// ===== 字典数据 =====
export const mockDicts: DictType[] = [
  {
    id: 1, code: 'member_status', name: '会员状态', description: '会员账户状态', status: 1, createdAt: '2023-01-01',
    items: [
      { id: 1, dictTypeId: 1, label: '正常', value: 'normal', sort: 1, status: 1 },
      { id: 2, dictTypeId: 1, label: '冻结', value: 'frozen', sort: 2, status: 1 },
      { id: 3, dictTypeId: 1, label: '过期', value: 'expired', sort: 3, status: 1 },
      { id: 4, dictTypeId: 1, label: '作废', value: 'cancelled', sort: 4, status: 1 },
    ],
  },
  {
    id: 2, code: 'card_type', name: '卡类型', description: '会员卡种类型', status: 1, createdAt: '2023-01-01',
    items: [
      { id: 5, dictTypeId: 2, label: '月卡', value: 'month_card', sort: 1, status: 1 },
      { id: 6, dictTypeId: 2, label: '季卡', value: 'quarter_card', sort: 2, status: 1 },
      { id: 7, dictTypeId: 2, label: '年卡', value: 'year_card', sort: 3, status: 1 },
      { id: 8, dictTypeId: 2, label: '次卡', value: 'count_card', sort: 4, status: 1 },
      { id: 9, dictTypeId: 2, label: '终身卡', value: 'lifetime_card', sort: 5, status: 1 },
      { id: 10, dictTypeId: 2, label: '储值卡', value: 'stored_card', sort: 6, status: 1 },
    ],
  },
  {
    id: 3, code: 'course_type', name: '课程类型', description: '健身课程类型', status: 1, createdAt: '2023-01-01',
    items: [
      { id: 11, dictTypeId: 3, label: '私教一对一', value: 'pt_solo', sort: 1, status: 1 },
      { id: 12, dictTypeId: 3, label: '私教小班课', value: 'pt_small', sort: 2, status: 1 },
      { id: 13, dictTypeId: 3, label: '团课', value: 'group', sort: 3, status: 1 },
    ],
  },
  {
    id: 4, code: 'pay_method', name: '支付方式', description: '收款支付方式', status: 1, createdAt: '2023-01-01',
    items: [
      { id: 14, dictTypeId: 4, label: '微信', value: 'wechat', sort: 1, status: 1 },
      { id: 15, dictTypeId: 4, label: '支付宝', value: 'alipay', sort: 2, status: 1 },
      { id: 16, dictTypeId: 4, label: '现金', value: 'cash', sort: 3, status: 1 },
      { id: 17, dictTypeId: 4, label: '转账', value: 'transfer', sort: 4, status: 1 },
      { id: 18, dictTypeId: 4, label: '欠款', value: 'debt', sort: 5, status: 1 },
    ],
  },
  {
    id: 5, code: 'body_tag', name: '身体状况标签', description: '会员身体状况标签', status: 1, createdAt: '2023-01-01',
    items: [
      { id: 19, dictTypeId: 5, label: '减脂', value: 'fat_loss', sort: 1, status: 1 },
      { id: 20, dictTypeId: 5, label: '增肌', value: 'muscle_gain', sort: 2, status: 1 },
      { id: 21, dictTypeId: 5, label: '体态矫正', value: 'posture', sort: 3, status: 1 },
      { id: 22, dictTypeId: 5, label: '康复训练', value: 'rehabilitation', sort: 4, status: 1 },
    ],
  },
  {
    id: 6, code: 'member_source', name: '会员来源', description: '会员获客来源渠道', status: 1, createdAt: '2023-01-01',
    items: [
      { id: 23, dictTypeId: 6, label: '自然进店', value: 'walk_in', sort: 1, status: 1 },
      { id: 24, dictTypeId: 6, label: '老会员转介绍', value: 'referral', sort: 2, status: 1 },
      { id: 25, dictTypeId: 6, label: '抖音/小红书', value: 'social_media', sort: 3, status: 1 },
      { id: 26, dictTypeId: 6, label: '团购/美团', value: 'group_buy', sort: 4, status: 1 },
      { id: 27, dictTypeId: 6, label: '活动引流', value: 'activity', sort: 5, status: 1 },
    ],
  },
]

// ===== 卡种产品 =====
export const mockCardProducts: CardProduct[] = [
  { id: 1, name: '月卡', type: 'time', typeLabel: '时间卡', price: 299, originalPrice: 399, validDays: 30, maxStopCount: 1, storeIds: [1, 2, 3], status: 1, description: '30天无限次入场', createdAt: '2023-01-01' },
  { id: 2, name: '季卡', type: 'time', typeLabel: '时间卡', price: 799, originalPrice: 1099, validDays: 90, maxStopCount: 2, storeIds: [1, 2, 3], status: 1, description: '90天无限次入场', createdAt: '2023-01-01' },
  { id: 3, name: '半年卡', type: 'time', typeLabel: '时间卡', price: 1399, originalPrice: 1999, validDays: 180, maxStopCount: 3, storeIds: [1, 2, 3], status: 1, description: '180天无限次入场', createdAt: '2023-01-01' },
  { id: 4, name: '年卡', type: 'time', typeLabel: '时间卡', price: 2199, originalPrice: 3199, validDays: 365, giftDays: 30, maxStopCount: 4, storeIds: [1, 2, 3], status: 1, description: '365天+赠送30天无限次入场', createdAt: '2023-01-01' },
  { id: 5, name: '次卡(20次)', type: 'count', typeLabel: '次数卡', price: 599, originalPrice: 799, totalCount: 20, maxStopCount: 0, storeIds: [1, 2, 3], status: 1, description: '20次通用入场次卡', createdAt: '2023-01-01' },
  { id: 6, name: '私教课包(10节)', type: 'pt', typeLabel: '私教卡', price: 3800, originalPrice: 4500, totalCount: 10, maxStopCount: 0, storeIds: [1, 2, 3], status: 1, description: '10节一对一私教课程', createdAt: '2023-01-01' },
  { id: 7, name: '私教课包(20节)', type: 'pt', typeLabel: '私教卡', price: 7200, originalPrice: 9000, totalCount: 20, maxStopCount: 0, storeIds: [1, 2, 3], status: 1, description: '20节一对一私教课程，赠送2节', giftCount: 2, createdAt: '2023-01-01' },
  { id: 8, name: '储值卡(1000元)', type: 'stored', typeLabel: '储值卡', price: 1000, originalPrice: 1000, maxStopCount: 0, storeIds: [1, 2, 3], status: 1, description: '充1000得1100，赠送100元', giftCount: 100, createdAt: '2023-01-01' },
  { id: 9, name: '体验卡(7天)', type: 'special', typeLabel: '特殊卡', price: 99, originalPrice: 199, validDays: 7, maxStopCount: 0, storeIds: [1, 2, 3], status: 1, description: '7天体验入场卡，新会员专享', createdAt: '2023-01-01' },
  { id: 10, name: '情侣卡(年卡)', type: 'special', typeLabel: '特殊卡', price: 3599, originalPrice: 4399, validDays: 365, maxStopCount: 2, storeIds: [1, 2], status: 1, description: '两人共享年卡', createdAt: '2023-01-01' },
]

// ===== 会员卡数据 =====
const memberCards: MemberCard[] = [
  { id: 1, memberId: 1, cardName: '年卡', cardType: 'time', startDate: '2024-01-01', endDate: '2025-01-01', status: 'normal', stopCount: 0, maxStopCount: 4 },
  { id: 2, memberId: 1, cardName: '私教课包(20节)', cardType: 'pt', startDate: '2024-03-01', endDate: '2025-03-01', remainCount: 12, totalCount: 20, status: 'normal', stopCount: 0, maxStopCount: 0 },
  { id: 3, memberId: 2, cardName: '季卡', cardType: 'time', startDate: '2024-09-01', endDate: '2024-12-01', status: 'expired', stopCount: 1, maxStopCount: 2 },
  { id: 4, memberId: 3, cardName: '月卡', cardType: 'time', startDate: '2024-11-01', endDate: '2024-12-01', status: 'frozen', frozenReason: '出差暂停', stopCount: 1, maxStopCount: 1 },
  { id: 5, memberId: 4, cardName: '年卡', cardType: 'time', startDate: '2024-06-01', endDate: '2025-06-01', status: 'normal', stopCount: 0, maxStopCount: 4 },
  { id: 6, memberId: 5, cardName: '次卡(20次)', cardType: 'count', startDate: '2024-08-01', endDate: '2025-08-01', remainCount: 8, totalCount: 20, status: 'normal', stopCount: 0, maxStopCount: 0 },
]

// ===== 会员数据 =====
export const mockMembers: Member[] = [
  { id: 1, memberNo: 'M20240001', name: '张小美', phone: '13900001001', gender: 'female', birthday: '1995-06-15', height: 165, weight: 55, joinDate: '2024-01-01', source: '老会员转介绍', emergencyContact: '张大明', emergencyPhone: '13900001000', status: 'normal', tags: ['减脂', '增肌'], storeId: 1, storeName: '总部旗舰店', cards: memberCards.filter(c => c.memberId === 1), ptRemain: 12, balance: 0, createdAt: '2024-01-01' },
  { id: 2, memberNo: 'M20240002', name: '李建国', phone: '13900001002', gender: 'male', birthday: '1988-03-22', height: 178, weight: 85, joinDate: '2024-03-15', source: '自然进店', status: 'expired', tags: ['增肌'], storeId: 1, storeName: '总部旗舰店', cards: memberCards.filter(c => c.memberId === 2), ptRemain: 0, balance: 0, createdAt: '2024-03-15' },
  { id: 3, memberNo: 'M20240003', name: '王淑芬', phone: '13900001003', gender: 'female', birthday: '1992-11-08', height: 160, weight: 62, joinDate: '2024-05-20', source: '抖音/小红书', status: 'frozen', tags: ['减脂', '体态矫正'], storeId: 1, storeName: '总部旗舰店', cards: memberCards.filter(c => c.memberId === 3), ptRemain: 0, balance: 500, createdAt: '2024-05-20' },
  { id: 4, memberNo: 'M20240004', name: '赵强', phone: '13900001004', gender: 'male', birthday: '1985-07-30', height: 175, weight: 75, joinDate: '2024-06-10', source: '团购/美团', status: 'normal', tags: ['增肌'], storeId: 1, storeName: '总部旗舰店', cards: memberCards.filter(c => c.memberId === 4), ptRemain: 5, balance: 0, createdAt: '2024-06-10' },
  { id: 5, memberNo: 'M20240005', name: '孙丽丽', phone: '13900001005', gender: 'female', birthday: '1998-02-14', height: 162, weight: 52, joinDate: '2024-08-01', source: '活动引流', status: 'normal', tags: ['减脂', '康复训练'], storeId: 2, storeName: '望京店', cards: memberCards.filter(c => c.memberId === 5), ptRemain: 0, balance: 1200, createdAt: '2024-08-01' },
  { id: 6, memberNo: 'M20240006', name: '周大力', phone: '13900001006', gender: 'male', birthday: '1990-09-18', height: 180, weight: 90, joinDate: '2024-09-15', source: '自然进店', status: 'normal', tags: ['增肌'], storeId: 1, storeName: '总部旗舰店', cards: [], ptRemain: 8, balance: 0, createdAt: '2024-09-15' },
  { id: 7, memberNo: 'M20240007', name: '吴小燕', phone: '13900001007', gender: 'female', birthday: '1996-12-25', height: 158, weight: 58, joinDate: '2024-10-01', source: '老会员转介绍', status: 'normal', tags: ['减脂', '体态矫正'], storeId: 2, storeName: '望京店', cards: [], ptRemain: 0, balance: 0, createdAt: '2024-10-01' },
  { id: 8, memberNo: 'M20240008', name: '郑海涛', phone: '13900001008', gender: 'male', birthday: '1987-04-12', height: 172, weight: 78, joinDate: '2024-10-20', source: '抖音/小红书', status: 'normal', tags: ['康复训练'], storeId: 3, storeName: '中关村店', cards: [], ptRemain: 0, balance: 300, createdAt: '2024-10-20' },
  { id: 9, memberNo: 'M20230009', name: '钱伟', phone: '13900001009', gender: 'male', birthday: '1982-08-05', height: 170, weight: 80, joinDate: '2023-05-01', source: '自然进店', status: 'expired', tags: ['增肌'], storeId: 1, storeName: '总部旗舰店', cards: [], ptRemain: 0, balance: 0, createdAt: '2023-05-01' },
  { id: 10, memberNo: 'M20240010', name: '冯静怡', phone: '13900001010', gender: 'female', birthday: '2000-01-20', height: 167, weight: 56, joinDate: '2024-11-01', source: '活动引流', status: 'normal', tags: ['减脂'], storeId: 1, storeName: '总部旗舰店', cards: [], ptRemain: 6, balance: 0, createdAt: '2024-11-01' },
]

// ===== 订单数据 =====
export const mockOrders: Order[] = [
  { id: 1, orderNo: 'ORD20240101001', memberId: 1, memberName: '张小美', memberPhone: '13900001001', cardProductId: 4, cardProductName: '年卡', originalPrice: 3199, actualPrice: 2199, discount: 0.69, payMethod: 'wechat', payMethodLabel: '微信', handlerId: 3, handlerName: '王前台', storeId: 1, storeName: '总部旗舰店', status: 'paid', createdAt: '2024-01-01 10:23:15' },
  { id: 2, orderNo: 'ORD20240101002', memberId: 1, memberName: '张小美', memberPhone: '13900001001', cardProductId: 7, cardProductName: '私教课包(20节)', originalPrice: 9000, actualPrice: 7200, discount: 0.8, payMethod: 'alipay', payMethodLabel: '支付宝', handlerId: 4, handlerName: '陈教练', storeId: 1, storeName: '总部旗舰店', status: 'paid', createdAt: '2024-03-01 14:30:00' },
  { id: 3, orderNo: 'ORD20240315001', memberId: 2, memberName: '李建国', memberPhone: '13900001002', cardProductId: 2, cardProductName: '季卡', originalPrice: 1099, actualPrice: 799, discount: 0.73, payMethod: 'cash', payMethodLabel: '现金', handlerId: 3, handlerName: '王前台', storeId: 1, storeName: '总部旗舰店', status: 'paid', createdAt: '2024-03-15 09:15:00' },
  { id: 4, orderNo: 'ORD20240520001', memberId: 3, memberName: '王淑芬', memberPhone: '13900001003', cardProductId: 1, cardProductName: '月卡', originalPrice: 399, actualPrice: 299, discount: 0.75, payMethod: 'wechat', payMethodLabel: '微信', handlerId: 3, handlerName: '王前台', storeId: 1, storeName: '总部旗舰店', status: 'paid', createdAt: '2024-05-20 11:00:00' },
  { id: 5, orderNo: 'ORD20240610001', memberId: 4, memberName: '赵强', memberPhone: '13900001004', cardProductId: 4, cardProductName: '年卡', originalPrice: 3199, actualPrice: 2199, discount: 0.69, payMethod: 'transfer', payMethodLabel: '转账', handlerId: 3, handlerName: '王前台', storeId: 1, storeName: '总部旗舰店', status: 'paid', createdAt: '2024-06-10 16:45:00' },
  { id: 6, orderNo: 'ORD20240801001', memberId: 5, memberName: '孙丽丽', memberPhone: '13900001005', cardProductId: 5, cardProductName: '次卡(20次)', originalPrice: 799, actualPrice: 599, discount: 0.75, payMethod: 'wechat', payMethodLabel: '微信', handlerId: 3, handlerName: '王前台', storeId: 2, storeName: '望京店', status: 'paid', createdAt: '2024-08-01 10:00:00' },
]

// ===== 签到记录 =====
export const mockCheckIns: CheckInRecord[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  memberId: (i % 10) + 1,
  memberName: mockMembers[i % 10].name,
  memberPhone: mockMembers[i % 10].phone,
  checkInTime: `2024-${String(Math.floor(i / 10) + 10).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')} ${String(6 + (i % 14)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}:00`,
  checkOutTime: `2024-${String(Math.floor(i / 10) + 10).padStart(2, '0')}-${String((i % 28) + 1).padStart(2, '0')} ${String(8 + (i % 14)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}:00`,
  type: (['card', 'face', 'phone'] as const)[i % 3],
  storeId: (i % 3) + 1,
  storeName: mockStores[i % 3].name,
}))

// ===== 跟进记录 =====
export const mockFollowRecords: FollowRecord[] = [
  { id: 1, memberId: 1, content: '会员反馈减脂效果明显，体重下降3kg，继续跟进训练计划', followerId: 4, followerName: '陈教练', followType: 'visit', createdAt: '2024-11-15 14:00:00' },
  { id: 2, memberId: 1, content: '电话回访，会员表示最近工作忙，排课调整到周末', followerId: 4, followerName: '陈教练', followType: 'call', createdAt: '2024-11-01 10:30:00' },
  { id: 3, memberId: 2, content: '会员卡已过期，电话邀约续卡，会员表示考虑中', followerId: 3, followerName: '王前台', followType: 'call', createdAt: '2024-12-10 11:00:00' },
  { id: 4, memberId: 3, content: '会员出差回来，办理解冻手续，恢复正常使用', followerId: 3, followerName: '王前台', followType: 'visit', createdAt: '2024-11-20 09:00:00' },
]

// ===== 线索数据 =====
export const mockLeads: Lead[] = [
  { id: 1, name: '刘梅', phone: '13911001001', gender: 'female', source: '抖音/小红书', status: 'following', statusLabel: '跟进中', assignedTo: 3, assignedName: '王前台', lastFollowTime: '2024-12-10', followCount: 3, remark: '对减脂课程感兴趣，约了体验课', storeId: 1, storeName: '总部旗舰店', createdAt: '2024-12-05' },
  { id: 2, name: '陈磊', phone: '13911001002', gender: 'male', source: '自然进店', status: 'trial', statusLabel: '体验中', assignedTo: 4, assignedName: '陈教练', lastFollowTime: '2024-12-12', followCount: 2, remark: '已完成体验课，对私教感兴趣', storeId: 1, storeName: '总部旗舰店', createdAt: '2024-12-08' },
  { id: 3, name: '黄晓燕', phone: '13911001003', gender: 'female', source: '团购/美团', status: 'new', statusLabel: '新线索', followCount: 0, storeId: 2, storeName: '望京店', createdAt: '2024-12-14' },
  { id: 4, name: '徐振东', phone: '13911001004', gender: 'male', source: '老会员转介绍', status: 'converted', statusLabel: '已转化', assignedTo: 3, assignedName: '王前台', lastFollowTime: '2024-12-01', followCount: 5, remark: '已办理年卡', storeId: 1, storeName: '总部旗舰店', createdAt: '2024-11-25' },
  { id: 5, name: '林小芳', phone: '13911001005', gender: 'female', source: '活动引流', status: 'lost', statusLabel: '已流失', assignedTo: 3, assignedName: '王前台', lastFollowTime: '2024-11-20', followCount: 4, remark: '选择了其他健身房', storeId: 1, storeName: '总部旗舰店', createdAt: '2024-11-10' },
]

// ===== 操作日志 =====
export const mockOperationLogs: OperationLog[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  userId: [1, 2, 3, 4, 5][i % 5],
  userName: ['张超级', '李店长', '王前台', '陈教练', '刘财务'][i % 5],
  module: ['会员管理', '卡项管理', '系统管理', '财务管理', '课程管理'][i % 5],
  action: ['新增', '修改', '删除', '查询', '导出'][i % 5],
  content: [`操作了会员${i + 1}的信息`, `修改了卡项${i + 1}`, `更新了系统配置`, `查询了财务报表`, `导出了课程数据`][i % 5],
  ip: `192.168.1.${(i % 50) + 100}`,
  status: i % 10 === 0 ? 0 : 1,
  createdAt: `2024-12-${String((i % 28) + 1).padStart(2, '0')} ${String(8 + (i % 14)).padStart(2, '0')}:${String(i % 60).padStart(2, '0')}:00`,
}))
