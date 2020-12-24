FROM node:erbium-slim

LABEL org.opencontainers.image.source https://github.com/UNRULYEON/mitsumori

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

COPY yarn.lock ./

RUN yarn
RUN yarn global add typescript

COPY . ./

RUN yarn build:prod

RUN rm -rf client

CMD ["yarn", "start:prod"]