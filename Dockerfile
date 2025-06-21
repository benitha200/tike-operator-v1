# Use the official Node.js image
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package.json yarn.lock* ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the app
RUN yarn build

# ────────────────────────────────────────────────
# Production image
FROM node:20-alpine AS runner

# Set working directory
WORKDIR /app

# Set NODE_ENV for production
ENV NODE_ENV=production

# Install only production dependencies
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --frozen-lockfile --production

# Copy built app from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Expose port
EXPOSE 3011

# Start the Next.js app
CMD ["yarn", "start"]
