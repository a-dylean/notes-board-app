FROM node:18.12.1

WORKDIR /opt/app
COPY package.json /opt/app/
COPY package-lock.json /opt/app/

RUN npm install

COPY tsconfig.json /opt/app/
COPY prisma /opt/app/prisma
COPY src /opt/app/src

RUN npm run build

EXPOSE 5000

CMD ["node", "build/index.js"]