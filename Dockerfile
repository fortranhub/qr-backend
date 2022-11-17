FROM node:19.0.0

USER 0

COPY . /qr-backend
WORKDIR /qr-backend

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]
