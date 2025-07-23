# ======== BUILD STAGE ========
FROM node:18-alpine AS builder

WORKDIR /home/node/app

# Copy lockfile + package.json
COPY package.json yarn.lock ./

RUN yarn install --production

COPY ./src ./src
COPY ./public ./public

FROM node:18-alpine

WORKDIR /home/node/app

ENV NODE_ENV=production

COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/package.json ./
COPY --from=builder /home/node/app/src ./src
COPY --from=builder /home/node/app/public ./public

EXPOSE 5000

CMD ["node", "src/index.js"]
