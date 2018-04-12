FROM node:9.4 as build
COPY . .
RUN npm install
RUN npm run build

FROM node:9.4 as release
COPY --from=build /build ./build
RUN npm install -g serve
EXPOSE 4000
CMD [ "serve", "-s", "build" ]