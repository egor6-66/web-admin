ARG IMAGE=node

FROM $IMAGE AS dev


WORKDIR /usr/src/app
COPY . /usr/src/app
COPY ../../node_modules /usr/src/app

CMD npm run devserver