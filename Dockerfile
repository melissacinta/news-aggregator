FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm i -g serve

COPY . .
RUN npm run build

EXPOSE 3000

# Add configuration for serve to handle client-side routing
CMD ["serve", "-s", "dist", "--single"]
