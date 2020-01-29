ARG BASE_IMAGE=keybaseio/client:latest-node
FROM $BASE_IMAGE AS base

WORKDIR /app
COPY . /app
RUN yarn
CMD node /app/index.js
