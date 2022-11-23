FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@8.19.2

RUN npm install && npm install typescript

USER node

COPY --chown=node:node . .

# RUN chmod 777 /opt

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

