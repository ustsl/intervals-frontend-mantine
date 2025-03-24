import { encryptPassword } from "@/functions/crypto";

// Функция авторизации пользователя (логин) с использованием FormData
export const loginUser = async (email: string, password: string) => {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
        console.log(email, password)
        const response = await fetch("https://api.intervals.ru/auth/jwt/login", {
            method: "POST",
            body: formData,
        });


        if (response.ok) {

            const data = await response.json();

            if (data.access_token && data.token_type) {
                const encryptedPassword = encryptPassword(password);
                localStorage.setItem("login", email);
                localStorage.setItem("password", encryptedPassword);
                localStorage.setItem("token", data.access_token);
                console.log("Авторизация успешна");
                return data.access_token;
            } else {
                console.log("Авторизация неуспешна: неверный ответ сервера");
                return null;
            }
        } else {
            const data = await response.json();
            console.log(data);
            console.log("Авторизация неуспешна: код ошибки", response.status);
            return null;
        }
    } catch (error) {
        console.log("Ошибка авторизации:", error);
        return null;
    }
};

// Функция регистрации пользователя с использованием raw JSON
export const registerUser = async (email: string, password: string) => {
    const payload = JSON.stringify({
        email: email,
        password: password,
    });

    try {
        const response = await fetch("https://api.intervals.ru/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: payload,
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Регистрация успешна");
            return data;
        } else {
            const data = await response.json();
            console.log(data);
            console.log("Регистрация неуспешна: код ошибки", response.status);
            return null;
        }
    } catch (error) {
        console.log("Ошибка регистрации:", error);
        return null;
    }
};
