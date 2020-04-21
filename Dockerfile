
FROM node:latest

ADD . /home/app

WORKDIR /home/app

CMD npx egg-scripts start --title=store-api
