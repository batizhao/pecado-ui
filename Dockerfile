FROM node:14.15.3-alpine3.12 as builder
WORKDIR /usr/src/app/
COPY package.json ./
RUN npm install --registry=https://registry.npm.taobao.org
COPY ./ ./
RUN npm run build


FROM nginx
WORKDIR /usr/share/nginx/html/
COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/dist  /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]