FROM node:18

COPY ./ ./

RUN npm i

RUN npx tsc index.ts

EXPOSE 9000

ENTRYPOINT [ "node", "index.js" ] 