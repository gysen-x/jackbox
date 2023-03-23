FROM node:18.12.1
#WORKDIR /app
#COPY package.json ./
#COPY package-lock.json ./
#COPY ./ ./
#RUN npm install
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

CMD [ "npm", "start" ]
EXPOSE 4000
#CMD ["node", "src/app.js"]