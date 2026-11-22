FROM node:20-alpine
WORKDIR /app
COPY app/backend ./app/backend
EXPOSE 3000
CMD [ "node", "app/backend/server.js" ]
