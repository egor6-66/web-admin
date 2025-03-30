FROM node:20-alpine AS node
WORKDIR /app
COPY ./server .
RUN npm install
EXPOSE 9808
CMD ["npm", "run", "start:prod"]


FROM nginx AS nginx
RUN rm /etc/nginx/conf.d/default.conf
RUN rm /etc/nginx/nginx.conf
COPY ./ssl ./etc/nginx/ssl
COPY ./nginx.conf ./etc/nginx/nginx.conf

