FROM node:18.12.1

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json

RUN npm install

COPY postcss.config.js /app/postcss.config.js
COPY tsconfig.json /app/tsconfig.json
COPY tailwind.config.ts /app/tailwind.config.ts
COPY next.config.js /app/next.config.js


COPY public /app/public
COPY src /app/src

EXPOSE 3000
CMD npx next dev -p 3000