
FROM node:latest

ADD . /home/app

WORKDIR /home/app

CMD npx egg-scripts start --port=7001 --title=egg-server-showcase
