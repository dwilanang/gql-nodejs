# syntax=docker/dockerfile:1

FROM node:14.17.0

# Create app directory
WORKDIR /usr/service

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/service/

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production
RUN npm install -g nodemon
# Bundle app source
COPY . .

# EXPOSE 4000

CMD [ "npm", "start" ]