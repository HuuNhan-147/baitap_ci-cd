FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the React application
RUN npm run build

# Install serve to run the built app
RUN npm install -g serve

# Expose port 5173
EXPOSE 5173

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "5173"]
