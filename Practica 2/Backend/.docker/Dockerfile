FROM node:lts-alpine
WORKDIR /app
ENV TZ=America/Guatemala
# Packages
RUN apk update \
    && npm install \
    && cp /usr/share/zoneinfo/America/Guatemala /etc/localtime \
    && echo "America/Guatemala" > /etc/timezone \
    && sync

COPY . .

EXPOSE 80

CMD [ "npm", "start-dev" ]