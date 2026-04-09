# Render.com Build Configuration

# Use Ubuntu 20.04 (compatible GLIBC)
FROM node:18-bullseye-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install with rebuild flag
RUN npm ci --only=production --no-optional

# Copy application code
COPY . .

# Seed database
RUN npm run seed

# Expose port
EXPOSE 10000

# Start application
CMD ["npm", "start"]