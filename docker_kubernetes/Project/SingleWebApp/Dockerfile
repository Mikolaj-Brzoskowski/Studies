FROM node:alpine AS builder
WORKDIR /opt/app
COPY package.json .
RUN npm install
COPY . .
RUN chmod a+x /opt/app/node_modules/.bin/react-scripts
RUN npm run build

FROM nginx
COPY --from=builder /opt/app/build /usr/share/nginx/html