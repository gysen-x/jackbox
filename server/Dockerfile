FROM node:18.12.1
#WORKDIR /app
#COPY package.json ./
#COPY package-lock.json ./
#COPY ./ ./
#RUN npm install
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV DB_USERNAME=admin
ENV DB_PASS=pass
ENV DB_NAME=fbgame
ENV DB_HOST=45.9.42.85
ENV DB_DIALECT=postgres
ENV DATABASE_URL=postgres://admin:pass@45.9.42.85:5432/fbgame
COPY package.json /usr/src/app/
RUN npm install
COPY . /usr/src/app

CMD [ "npm", "start" ]
EXPOSE 4000
#CMD ["node", "src/app.js"]