FROM node:18-alpine AS builder

WORKDIR /home/node/app


COPY package.json package-lock.json ./

RUN npm ci --omit=dev

COPY ./src ./src

FROM node:18-alpine

WORKDIR /home/node/app

ENV NODE_ENV=production

# Copy only needed production files from builder
COPY --from=builder /home/node/app/node_modules ./node_modules
COPY --from=builder /home/node/app/package.json ./
COPY --from=builder /home/node/app/src ./src

EXPOSE 5000

CMD ["node", "src/index.js"]
