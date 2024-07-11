import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import path from 'path';
import { iniPassport } from './config/passport.config.js';
import { authRouter } from './routes/auth.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { chatRouter } from './routes/chats.router.js';
import { coockieRouter } from './routes/cookies.router.js';
import { cartsHtml } from './routes/homeCarts.router.js';
import { productsHtml } from './routes/homeProducts.router.js';
import { productsRouter } from './routes/products.router.js';
import { productsRealTime } from './routes/realTimeProducts.router.js';
import { sessionsRouter } from './routes/sessions.router.js';
import { __dirname, connectMongo, connectSocket } from './utils.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Socket.io webSockets
const httpServer = app.listen(port, () => {
  console.log(`🍕 App listening on port ➡️  http://localhost:${port}`);
});

//mongo
connectMongo();

//cookies
app.use(cookieParser());

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://' + MONGO_USER + ':' + MONGO_PASS + '@coderbackend.1nd8mzz.mongodb.net/ecommerce',
      ttl: 7200,
    }),
    secret: 'un-re-secreto',
    resave: true,
    saveUninitialized: true,
  })
);

iniPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('/', (req, res) => {
  return res.redirect('http://localhost:8080/auth/login');
});
app.use('/products', productsHtml);
app.use('/carts', cartsHtml);
app.use('/realtimeproducts', productsRealTime);
app.use('/chat', chatRouter);
app.use('/auth', authRouter);

app.use('/api/cookies', coockieRouter);


app.use('/api/sessions', sessionsRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

connectSocket(httpServer);

app.get('*', (req, res) => {
  return res.status(404).json({ status: 'error', message: 'No encontrado' });
});
