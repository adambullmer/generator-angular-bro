FROM alpine:3.6
MAINTAINER Adam Bullmer <psycodrumfreak@gmail.com>

RUN apk update && \
    apk add --no-cache \
        git \
        tar \
        gzip \
        ca-certificates \
        nodejs \
        nodejs-npm \
    && \
    rm -rf /var/cache/apk/*
