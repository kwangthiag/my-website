# Backend Dockerfile

FROM node:16
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the backend application
COPY ./ ./

# Expose port 5000 for the backend
EXPOSE 5000

# Start the backend server
CMD ["node", "server.js"]
