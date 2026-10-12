# ==============================================================================
# Sikobokan Next.js 16 Web Application - Multi-Stage Containerfile
# Base: node:20-alpine (Ultra-slim, standalone output, non-root user)
# Author: Kanjut (DevOps Engineer Tim Sikobokan)
# ==============================================================================

# Stage 1: Base Alpine Environment
FROM node:20-alpine AS base
LABEL maintainer="Kanjut <devops@sikobokan.local>"
LABEL description="Production Next.js 16 standalone container for invitation-app"

# libc6-compat is required by Alpine for process compatibility
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ------------------------------------------------------------------------------
# Stage 2: Dependencies Installation
# ------------------------------------------------------------------------------
FROM base AS deps
WORKDIR /app

# Copy dependency definition files
COPY package.json package-lock.json ./

# Install exact production & build dependencies using npm clean install
RUN npm ci

# ------------------------------------------------------------------------------
# Stage 3: Source Builder
# ------------------------------------------------------------------------------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable telemetry during build for privacy and build speed
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Compile Next.js with standalone output
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 4: Production Runner (Minimal & Hardened)
# ------------------------------------------------------------------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create non-root system group and user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public static files
COPY --from=builder /app/public ./public

# Prepare .next directory and ensure permissions
RUN mkdir -p /app/.next && chown nextjs:nodejs /app/.next

# Copy standalone build output and static assets
# Next.js standalone creates a minimalist server.js in .next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose Next.js port
EXPOSE 3000

# Container healthcheck
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:3000/ || exit 1

# Start Next.js standalone server
CMD ["node", "server.js"]
