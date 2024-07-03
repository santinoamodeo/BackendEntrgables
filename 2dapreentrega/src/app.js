import express from 'express';
import handlebars from 'express-handlebars';
import path from 'path';
import { cartsRouter } from './routes/carts.router.js';
import { productsHtml } from './routes/homeProducts.router.js';
import { productsRouter } from './routes/products.router.js';
import { productsRealTime } from './routes/realTimeProducts.router.js';
import { __dirname, connectMongo, connectSocket } from './utils.js';
import { chatRouter } from './routes/chats.router.js';
import { cartsHtml } from './routes/homeCarts.router.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

//Socket.io webSockets
const httpServer = app.listen(port, () => {
  console.log(`🍕 App listening on port ➡️  http://localhost:${port}`);
});

/* Connet to Mongo */
connectMongo();

/* Api Rest JSON */
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

/* HTML Render */
app.use('/products', productsHtml);
app.use('/carts', cartsHtml);
app.use('/realtimeproducts', productsRealTime);
app.use('/chat', chatRouter);

/* Config Handlebars */
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

/* Socket */
connectSocket(httpServer);

app.get('*', (req, res) => {
  return res.status(404).json({ status: 'error', message: 'No encontrado' });
});
