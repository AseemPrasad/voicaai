FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (including dev for building)
RUN npm install

# Copy prisma schema and generate client
COPY prisma ./prisma/
RUN npx prisma generate

# Copy source code
COPY . .

# Build typescript
RUN npm run build || npx tsc

# Expose port
EXPOSE 3001

# Run the production server
CMD ["node", "dist/server.js"]
