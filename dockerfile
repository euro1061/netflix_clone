# Use official Node.js image as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Build the production version of the Next.js application
RUN npm run build

# Set environment variables
ENV NODE_ENV production
ENV PORT 3000

# Expose the port
EXPOSE $PORT

# Start the server
CMD ["npm", "start"]