ARG IMAGE=nginx:1.21.1-alpine

FROM $IMAGE AS dev
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
COPY ./ssl ./etc/nginx/ssl
COPY ./configs ./storage/configs
COPY ./nginx.dev.conf ./etc/nginx/nginx.conf

FROM $IMAGE AS prod
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
COPY ./ssl ./etc/nginx/ssl
COPY ./configs ./storage/configs
COPY ./modules/host/builds/development ./modules/host
COPY ./modules/mail-sender/builds/development ./modules/mail-sender
COPY ./nginx.conf ./etc/nginx/nginx.conf
