# --- STAGE 1: Build ---
# Используем официальный Node.js образ для сборки
FROM node:20-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и lock-файлы
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь исходный код в контейнер
COPY . .

# Генерируем Prisma клиент
RUN npx prisma generate

# Собираем приложение (NestJS → dist)
RUN npm run build

# --- STAGE 2: Production ---
# Используем лёгкий Node.js образ для продакшена
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости из builder-слоя
COPY --from=builder /app/node_modules ./node_modules

# Копируем собранный dist, prisma и скрипты
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

# Делаем entrypoint.sh исполняемым
RUN chmod +x ./entrypoint.sh

# Устанавливаем переменную окружения
ENV NODE_ENV=production

# Открываем порт
EXPOSE 8080

# Устанавливаем точку входа
ENTRYPOINT ["./entrypoint.sh"]
