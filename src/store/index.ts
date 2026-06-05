import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { UserInfo } from '@/types'

interface AuthState {
  token: string | null
  userInfo: UserInfo | null
  isLoggedIn: boolean
  login: (token: string, userInfo: UserInfo) => void
  logout: () => void
  updateUserInfo: (userInfo: Partial<UserInfo>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      userInfo: null,
      isLoggedIn: false,
      login: (token, userInfo) => set({ token, userInfo, isLoggedIn: true }),
      logout: () => set({ token: null, userInfo: null, isLoggedIn: false }),
      updateUserInfo: (info) =>
        set((state) => ({
          userInfo: state.userInfo ? { ...state.userInfo, ...info } : null,
        })),
    }),
    { name: 'fitness-auth' }
  )
)

interface AppState {
  collapsed: boolean
  theme: 'light' | 'dark'
  openTabs: TabItem[]
  activeTabKey: string
  toggleCollapsed: () => void
  setTheme: (theme: 'light' | 'dark') => void
  addTab: (tab: TabItem) => void
  removeTab: (key: string) => void
  setActiveTab: (key: string) => void
}

export interface TabItem {
  key: string
  label: string
  path: string
  closable?: boolean
}

export const useAppStore = create<AppState>((set) => ({
  collapsed: false,
  theme: 'light',
  openTabs: [{ key: '/dashboard', label: '首页大屏', path: '/dashboard', closable: false }],
  activeTabKey: '/dashboard',
  toggleCollapsed: () => set((s) => ({ collapsed: !s.collapsed })),
  setTheme: (theme) => set({ theme }),
  addTab: (tab) =>
    set((state) => {
      const exists = state.openTabs.find((t) => t.key === tab.key)
      if (exists) return { activeTabKey: tab.key }
      return { openTabs: [...state.openTabs, tab], activeTabKey: tab.key }
    }),
  removeTab: (key) =>
    set((state) => {
      const tabs = state.openTabs.filter((t) => t.key !== key)
      const active =
        state.activeTabKey === key
          ? tabs[tabs.length - 1]?.key || '/dashboard'
          : state.activeTabKey
      return { openTabs: tabs, activeTabKey: active }
    }),
  setActiveTab: (key) => set({ activeTabKey: key }),
}))
