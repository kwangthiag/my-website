# Frontend Dockerfile in the `client` directory

# Use a Node.js base image to build the React app
FROM node:16 AS build
WORKDIR /app

# Copy the frontend package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the React app's source code
COPY ./ ./

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the built app
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the frontend port
EXPOSE 80

# Default command for Nginx
CMD ["nginx", "-g", "daemon off;"]
