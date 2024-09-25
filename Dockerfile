# Dockerfile

# Step 1: Build the React app
# Use a Node.js base image
FROM node:16 AS build
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app and build
COPY ./client ./client
WORKDIR /app/client
RUN npm install
RUN npm run build

# Step 2: Set up Node.js server
FROM node:16
WORKDIR /app

# Copy package.json and install server dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the build output from React app and server code
COPY --from=build /app/client/build ./client/build
COPY ./server ./server

# Expose the app on port 5000
EXPOSE 5000

# Set environment variables (optional)
ENV NODE_ENV=production

# Start the server
CMD ["node", "server/server.js"]
