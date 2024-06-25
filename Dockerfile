# Docker-React-App/src/Dockerfile

# Stage 1: Build React frontend
FROM node:16 AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Set up Python backend
FROM python:3.10-slim AS backend

WORKDIR /app

COPY ../backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY ../backend/ ./
COPY --from=frontend-builder /app/build /app/static

EXPOSE 5000

CMD ["python", "app.py"]
