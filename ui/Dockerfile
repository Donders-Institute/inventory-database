# Build the static files
FROM node:12 as BUILD
WORKDIR /opt/inventory-database-ui-client
COPY $pwd/packages/client/package.json ./ 
COPY $pwd/packages/client/yarn.lock ./
RUN yarn install
COPY $pwd/packages/client/tsconfig.json ./
COPY $pwd/packages/client/.eslintrc.json ./
COPY $pwd/packages/client/*.less ./ 
COPY $pwd/packages/client/*.js ./ 
COPY $pwd/packages/client/src ./src
COPY $pwd/packages/client/public ./public
RUN yarn build

# Create the server
FROM node:12
WORKDIR /opt/inventory-database-ui-server
COPY $pwd/packages/server/package*.json ./
RUN npm install
COPY $pwd/packages/server/start-server.sh ./
COPY $pwd/packages/server/*.js ./
COPY $pwd/packages/server/bin ./bin
COPY $pwd/packages/server/routes ./routes
COPY $pwd/packages/server/views ./views
RUN ( chmod +x start-server.sh )
COPY --from=build /opt/inventory-database-ui-client/build /opt/inventory-database-ui-server/frontend
CMD [ "/opt/inventory-database-ui-server/start-server.sh" ]
