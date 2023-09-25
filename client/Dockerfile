FROM node:18.12.1

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install

COPY src /app/src
COPY public /app/public
COPY tsconfig.json /app/tsconfig.json
COPY tailwind.config.ts /app/tailwind.config.ts
COPY next.config.js /app/next.config.js

EXPOSE 3000
CMD npm run dev