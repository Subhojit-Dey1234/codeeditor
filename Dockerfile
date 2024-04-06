# Use an official Node runtime as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /usr/src/app
COPY codes .

# Install any needed packages specified in package.json
RUN npm init -y
RUN npm install

# Make port 80 available to the world outside this container

# Define environment variable
ARG FILE_PATH solution1.js

# Run app.js when the container launches
RUN echo "Building version ${FILE_PATH} for ${FILE_PATH} environment."
CMD node ${FILE_PATH}

RUN echo "Building version ${FILE_PATH} for ${FILE_PATH} environment."