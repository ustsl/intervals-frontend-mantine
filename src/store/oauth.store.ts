import { create } from 'zustand';
import { decryptPassword } from "@/functions/crypto";

interface IAuthStore {
    username: string | null;
    password: string | null;
    token: string | null;
    setAuth: (username: string, password: string, token: string) => void;
    setLogin: (username: string, password: string) => void;
    setToken: (token: string) => void;
    removeData: () => void;
}

// Функция безопасного получения данных из localStorage
const getLocalAuthData = () => {
    if (typeof window === 'undefined') return {
        username: null,
        password: null,
        token: null
    };

    const username = localStorage.getItem('login');
    const encryptedPassword = localStorage.getItem('password');
    const token = localStorage.getItem('token');

    const password = encryptedPassword ? decryptPassword(encryptedPassword) : null;

    return {
        username,
        password,
        token
    };
};

export const useAuthStore = create<IAuthStore>((set) => {
    const { username, password, token } = getLocalAuthData();

    return {
        username,
        password,
        token,
        setAuth: (username: string, password: string, token: string) =>
            set({ username, password, token }),
        setLogin: (username: string, password: string) =>
            set({ username, password }),
        setToken: (token: string) =>
            set({ token }),
        removeData: () => {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('login');
                localStorage.removeItem('password');
                localStorage.removeItem('token');
            }

            set({
                username: null,
                password: null,
                token: null,
            });
        }
    };
});
