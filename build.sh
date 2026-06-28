#!/bin/bash

# Render Build Script
echo "Starting build..."

# Install dependencies
echo "Installing dependencies..."
npm ci

# Initialize database
echo "Seeding database..."
npm run seed

echo "Build complete!"
