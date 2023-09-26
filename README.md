# Notes Board App #
Simple SPA made with TypeScript enabling users to create notes on a board. The functionality includes adding new notes, editing and deleting.

Deployed version [here](https://notes.atonkopiy.com/)

## Tech stack ##
Front-end:
* [Next.js](https://nextjs.org/docs)
* [React](https://react.dev/)
* [TanStack Query](https://tanstack.com/query/latest/docs/react/overview)
* [Axios](https://axios-http.com/docs/intro)
* [TailwindCSS](https://tailwindcss.com/)

Back-end:
* [Node.js](https://nodejs.org/en/docs)
* [Express.js](https://expressjs.com/)
* [SQLite](https://www.sqlite.org/index.html)
* [Prisma](https://www.prisma.io/docs)

## How to run locally ##
1. Clone the repositary
```
git clone https://github.com/a-dylean/notes-board-app.git
```
2. Build docker image in server folder and run it
```
docker build -t backend .
```
```
docker run -it backend
```
3. Install dependencies in client folder and run the app on localhost:3000
```
 npm i & npm run dev 
```

## Screenshots ##
<p align="center" width="100%">
<img width="849" alt="Screenshot 2023-09-25 201337" src="https://github.com/a-dylean/notes-board-app/assets/83976465/1d896a8c-a0d8-4b0c-9dc4-c076876fa11f">
</p>
