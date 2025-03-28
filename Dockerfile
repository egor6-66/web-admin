ARG IMAGE=nginx:1.21.1-alpine

FROM $IMAGE AS dev
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
COPY ./nginx.conf ./etc/nginx/nginx.conf
COPY ./ssl ./etc/nginx/ssl
COPY ./modules/host/builds/development ./modules/host
COPY ./modules/mail-sender/builds/development ./modules/mail-sender
