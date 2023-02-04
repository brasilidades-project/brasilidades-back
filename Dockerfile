FROM node:16.15
WORKDIR /viajar-no-brasil-back
COPY ./package*.json ./
COPY ./.husky ./
RUN npm install
COPY . ./viajar-no-brasil-back
ENV PORT=4002
EXPOSE 4002
RUN npm run test:migration:generate
RUN npm run test:migration:run
RUN npm run dev:migration:generate
RUN npm run dev:migration:run
RUN npm run dev:seed
CMD ["npm", "run", "dev"]