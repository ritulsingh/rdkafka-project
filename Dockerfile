#Specify a base image
FROM node:18.12.1-alpine3.17

#Specify a working directory
WORKDIR /usr/app

#Copy the dependencies file
COPY package*.json ./

# Install dependencies
RUN apk add --no-cache --virtual .gyp bash python3 make g++ \
    && npm install \
    && apk del .gyp

# Copy remaining files
COPY . .

# Run all the scripts
# CMD ["/bin/sh", "enterpoint.sh"]
