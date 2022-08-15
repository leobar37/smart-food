FROM node:16-alpine3.14 as base

RUN apk update


ARG DOPPLER_TOKEN=none
ENV DOPPLER_TOKEN=${DOPPLER_TOKEN}


# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler


WORKDIR /app

COPY admin/ .

RUN yarn install


RUN doppler secrets

RUN yarn build

EXPOSE 5000


CMD [ "yarn" , "start" ]























