#!/bin/bash

# Render Build Script
echo "Starting build..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Minify CSS/JS assets
echo "Minifying assets..."
npm run build

# Initialize database
echo "Seeding database..."
npm run seed

echo "Build complete!"
