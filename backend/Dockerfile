# backend/Dockerfile
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose backend port
EXPOSE 3000

# Start the server
CMD ["npm","run", "server"]
