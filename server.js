const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const port = 3000;
const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const placeRouter = require('./routes/placeRoutes');
const countryRouter = require('./routes/countryRoutes');

dotenv.config();

mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('Conectado ao DB !'))
.catch((err)=>console.log(err));

app.use(express.json({limit:'10mb'}));
app.use(express.urlencoded({limit:'10mb', extended:true}));
app.use(errorHandler);
app.use('/api/',authRouter);
app.use('/api/users',userRouter);
app.use('/api/places',placeRouter);
app.use('/api/countries',countryRouter);


app.get('/', (req, res) => res.send('Welcome to the Travel App Api'));
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));