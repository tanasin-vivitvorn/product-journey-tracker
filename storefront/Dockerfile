# Stage 1: Build the application
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Stage 2: Serve the application
FROM node:18

# Set working directory
WORKDIR /app

# Copy the built application from the previous stage
COPY --from=builder /app ./

# Install production dependencies only
RUN yarn install --production

# Expose the port on which the app will run
EXPOSE 3000

# Start the application
CMD ["yarn", "start"]

