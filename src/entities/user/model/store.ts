import { create } from 'zustand'
import { findUserByName, createUser } from '../api/userApi'
import { User } from './types'

const CURRENT_USER_KEY = 'currentUser'
interface UserState {
  currentUser: User | null
  login: (name: string) => Promise<User>
  logout: () => void
}

export const useUserStore = create<UserState>(set => ({
  currentUser: JSON.parse(localStorage.getItem(CURRENT_USER_KEY) || 'null'),
  login: async (name: string) => {
    let user = await findUserByName(name)

    if (!user) user = await createUser(name)

    set({ currentUser: user })

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
    return user
  },
  logout: () => {
    set({ currentUser: null })
    localStorage.removeItem(CURRENT_USER_KEY)
  },
}))
