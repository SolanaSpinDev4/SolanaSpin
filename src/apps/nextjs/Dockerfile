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

# Use a smaller base image for the production stage
FROM node:20-alpine AS production

# Set the working directory in the container
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build-env /app ./

# Start the application
CMD ["npm", "start"]

# Expose port 3000 to allow traffic to the Node.js server
EXPOSE 5200