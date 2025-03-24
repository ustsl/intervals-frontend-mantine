'use client';

import { useAuthStore } from "@/store/oauth.store";


export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const { token, username, password, setToken, removeData } = useAuthStore.getState();
    console.log(url)
    // Формируем заголовки, добавляя Authorization, если есть токен
    const headers = new Headers(options.headers || {});
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }
    const fetchOptions: RequestInit = { ...options, headers };

    let response = await fetch(url, fetchOptions);

    // Если получаем 401, пытаемся обновить токен
    if (response.status === 401) {
        if (!username || !password) {
            removeData();
            return response;
        }

        // Пытаемся авторизоваться заново
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const refreshResponse = await fetch('https://api.intervals.ru/auth/jwt/login', {
            method: 'POST',
            body: formData,
        });

        if (refreshResponse.status === 200) {
            const refreshData = await refreshResponse.json();
            if (refreshData.access_token && refreshData.token_type) {
                // Обновляем токен в zustand
                setToken(refreshData.access_token);
                headers.set('Authorization', `Bearer ${refreshData.access_token}`);
                response = await fetch(url, { ...options, headers });
            } else {
                removeData();
            }
        } else {
            removeData();
        }
    }

    return response;
}
