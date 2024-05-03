import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import productRouter from './routes/product.routes.js';
import orderRouter from './routes/order.routes.js';

const app = express();

function configureApp() {
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
      allowedHeaders: ['Content-Type'],
    })
  );
  app.use(cookieParser());
  const routers = [userRouter, productRouter, orderRouter];

  for (const router of routers) {
    app.use(router);
  }

  app.use('/images', express.static('src/public/images'));
}

async function configureMongoose() {
  await mongoose.connect(
    'mongodb+srv://admin:admin@cluster0.1bfhxjk.mongodb.net/?retryWrites=true&w=majority'
  );
}

configureApp();
await configureMongoose();

app.get('/', (req, res) => {
  res.send('Bem vindo ao nosso Projeto :)');
});

app.listen(3333, () => console.log('http://localhost:3333'));
