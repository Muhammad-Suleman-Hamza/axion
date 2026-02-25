FROM node:20-alpine

LABEL version="1.0"
LABEL maintainer="Muhammad Suleman Hamza"
LABEL usage="docker build -t <image-name> ."
LABEL description="Dockerfile to run 1 node app"
LABEL usage="docker run -p 5111:8080 <image-name>"

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5111

CMD ["npm", "start"]