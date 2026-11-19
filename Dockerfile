# --- Stage 1: Build the React app ---
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
# Use "npm run build" for Vite (outputs to /app/dist)
# or change to CRA's output if using Create React App
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:1.27-alpine AS production

# Replace default config with SPA-friendly routing config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Vite outputs to /app/dist; use /app/build if using Create React App
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]