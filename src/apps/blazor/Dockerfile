# Use the official .NET SDK 8.0 image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env

# Set the working directory in the container
WORKDIR /app

# Copy all files from the current directory to the working directory in the container
COPY . ./

# Publish the .NET application in Release configuration to the output directory
RUN dotnet publish ./client/Client.csproj -c Release -o output

# Use the official Nginx image as the runtime environment
FROM nginx:alpine

# Set the working directory in the container
WORKDIR /usr/share/nginx/html

# Copy the published output from the build environment to the Nginx HTML directory
COPY --from=build-env /app/output/wwwroot .

# Copy the custom Nginx configuration file to the Nginx configuration directory
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 5100 to allow traffic to the Nginx server
EXPOSE 5100
