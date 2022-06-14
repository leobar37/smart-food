FROM node:16-alpine3.14 as base
RUN apk update

WORKDIR /app

COPY  admin/package*.json ./

COPY admin/yarn.lock ./

RUN yarn install --frozen-lockfile

# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler

COPY admin/ .

RUN  ls

EXPOSE 5000

RUN yarn build

CMD [ "yarn" , "start" ]























