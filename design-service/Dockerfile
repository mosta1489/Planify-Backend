FROM node:18.14.2-alpine

WORKDIR /design

COPY . .

# RUN ["npm", "i"]


RUN ["npm", "i", "-g", "pm2"] 

# RUN ["npm", "run", "build"]

CMD [ "npm", "start"]