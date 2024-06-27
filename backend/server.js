import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js';
dotenv.config();
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send('API  is up & running...');
});

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//cookie parser middleware
app.use(cookieParser());


app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes)

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server is running on port ${port}`));