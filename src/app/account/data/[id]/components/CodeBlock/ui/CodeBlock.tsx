"use client";


import { Text, Paper, } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";

export const CodeBlock = ({ id }: { id: string }) => {

    const codeExample = `
# Получение токена
import requests

url = "https://api.intervals.ru/auth/jwt/login"
form_data = {
    "username": "Ваша почта",
    "password": "Ваш пароль"
}

response = requests.post(url, data=form_data)

if response.status_code == 200:
    result = response.json()
    access_token = result.get("access_token")
    Token = f"Bearer {access_token}"
else:
    print("Ошибка:", response.status_code, response.text)


# Патч-запрос для загрузки данных
url = "https://api.intervals.ru/data/${id}"

json_data = {
    "container": [
        {"month": "January", "clicks": 35000, "ctr": 4},
        {"month": "February", "clicks": 72000, "ctr": 7},
        {"month": "Marth", "clicks": 81000, "ctr": 5}
    ]
}

headers = {
    "Authorization": Token,
    "Content-Type": "application/json"
}

response = requests.patch(url, json=json_data, headers=headers)

if response.status_code == 200:
    print("Success:", response.json())
else:
    print("Error:", response.status_code, response.text)
  `;


    return (
        <Paper shadow="sm" p="md" withBorder>
            <Text w={500} mb="lg">
                Пример кода для загрузки данных в контейнер (Python 3)
            </Text>
            <CodeHighlight code={codeExample} language="python" />
        </Paper>
    );
};
