FROM node:8

# Create app directory
WORKDIR /usr/src/storage

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./ /usr/src/storage

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

EXPOSE 9567
CMD [ "clocal", "storage" ,"start" ]
