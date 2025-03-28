import { create } from 'zustand'

interface State {
    userName: string
    avatar: string
    setAvatar: (avatar: string) => void
    setUserName: (username: string) => void
}

export const useUserStore = create<State>()(set => ({
    userName: '',
    avatar: '',
    setAvatar: (avatar: string) => set({ avatar }),
    setUserName: (username: string) => set({ userName: username }),
}))
