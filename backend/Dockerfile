# Use Node.js official image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Run migrations
CMD ["npm", "run", "migrate"]

# Expose the port on which the backend will run
EXPOSE 3000

# Start the backend after migrations are completed
CMD ["npm", "start"]
