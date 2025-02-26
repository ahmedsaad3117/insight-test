FROM node:18-alpine as BUILD_IMAGE

WORKDIR /app

COPY package.json ./

# install dependencies
RUN npm install

COPY . .

# build
RUN npm run build

# remove dev dependencies
RUN npm prune --production

FROM node:18-alpine

WORKDIR /app

# copy from build image
COPY --from=BUILD_IMAGE /app/package.json ./package.json
COPY --from=BUILD_IMAGE /app/node_modules ./node_modules
COPY --from=BUILD_IMAGE /app/.next ./.next
COPY --from=BUILD_IMAGE /app/public ./public
COPY --from=BUILD_IMAGE /app/.env ./.env

EXPOSE 3000

CMD ["npm", "run", "start"]