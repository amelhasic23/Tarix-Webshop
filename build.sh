#!/bin/bash

# Render Build Script - No native modules needed
echo "Starting build..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Initialize database
echo "Seeding database..."
npm run seed

echo "Build complete!"
