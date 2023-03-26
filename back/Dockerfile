FROM node:16.15.0-alpine

WORKDIR /home/app/api

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN npm install

RUN npx prisma generate

EXPOSE 8080

CMD npm run dev

CMD npx prisma migrate dev --name init

CMD ["npm", "run", "dev"]