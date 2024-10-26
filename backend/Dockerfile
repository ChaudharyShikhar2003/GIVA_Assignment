# Use an official Node.js runtime as a base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application source
COPY . .

# Expose the port that the app runs on
EXPOSE 5000

# Run the application using nodemon in development
CMD ["npm", "run", "dev"]
    