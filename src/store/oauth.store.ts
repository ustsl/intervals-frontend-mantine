import { create } from 'zustand'

interface IAuthStore {
    username: string | null
    password: string | null
    token: string | null
    setAuth: (username: string, password: string, token: string) => void
    setLogin: (username: string, password: string) => void
    setToken: (token: string) => void
    removeData: () => void
}

export const useAuthStore = create<IAuthStore>((set) => ({
    username: '',
    password: '',
    token: '',
    setAuth: (username: string, password: string, token: string) =>
        set({ username, password, token }),
    setLogin: (username: string, password: string) =>
        set({ username, password }),
    setToken: (token: string) =>
        set({ token }),
    removeData: () => {
        // Очищаем localStorage
        localStorage.removeItem('login');
        localStorage.removeItem('password');
        localStorage.removeItem('token');

        // Сбрасываем значения в zustand
        set({
            username: null,
            password: null,
            token: null,
        });
    }
}));
