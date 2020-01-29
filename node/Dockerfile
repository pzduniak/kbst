ARG BASE_IMAGE=keybaseio/client:latest-node
FROM $BASE_IMAGE AS base

WORKDIR /app
COPY package.json /app/package.json
RUN yarn

COPY dist /app
CMD node /app/index.js
