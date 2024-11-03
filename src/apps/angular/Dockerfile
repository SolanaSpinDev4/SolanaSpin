# Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build-env

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Build the application
RUN npm run build

# Use the official Nginx image as the runtime environment
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the published output from the build environment to the Nginx HTML directory
COPY --from=build-env /app/dist/solana-spin/browser .

# Copy the custom Nginx configuration file to the Nginx configuration directory
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 5100 to allow traffic to the Nginx server
EXPOSE 5200
