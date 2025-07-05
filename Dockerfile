# Используем официальный Node.js образ
FROM node:20-alpine

# Задаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем только зависимости (для кеширования слоёв)
COPY package*.json ./
RUN npm install

# Копируем весь исходный код проекта
COPY . .

# Собираем приложение (NestJS build)
RUN npm run build


COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Указываем порт, который будет использоваться
EXPOSE 8080

# Запускаем приложение
CMD ["node", "dist/main"]
