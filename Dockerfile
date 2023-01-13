FROM node:18

LABEL org.opencontainers.image.source https://github.com/trevorsargent/tradfri

COPY ./ ./

RUN npm i

RUN npx tsc index.ts

EXPOSE 9000

ENTRYPOINT [ "node", "index.js" ] 