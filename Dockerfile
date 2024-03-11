# Use the official Node.js 14 image as base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 (or any other port your app listens on)
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
