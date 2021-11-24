const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan"); //logging
const connectDB = require("./config/db");
const connectSQLDB = require("./models/db");
const colors = require("colors");
const errorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const passport = require("passport");

//load enc vars
dotenv.config(({path: './config/config.env'}))

const app = express();

//logger middleware
if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'));
}

// parse requests of content-type: application/json
app.use(express.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// enabling cors for all requests by using cors middleware
app.use(cors());

//Cookie parser
app.use(cookieParser());

//connect to mongoDB
connectDB();

//connect to SQL
//connectSQLDB();

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

//Route files
const auth = require("./routes/auth");
const dishes = require("./routes/dishes");
const orders = require("./routes/orders");
const deliveryAddresses = require("./routes/deliveryAddresses");
const favorites = require("./routes/favorites");
const users = require("./routes/users");
const restaurants = require("./routes/restaurants");
const uploadImageS3 = require("./routes/uploadImageS3");

//Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/dishes', dishes);
app.use('/api/v1/orders', orders);
app.use('/api/v1/deliveryAddresses', deliveryAddresses);
app.use('/api/v1/favorites', favorites);
app.use('/api/v1/users', users);
app.use('/api/v1/restaurants', restaurants);
app.use('/api/v1/uploadImageS3', uploadImageS3);

//errorHandler middleware
app.use(errorHandler);

// set port, listen for requests
app.listen(5001, () => {
  console.log("Server is running on port 5001.".yellow);
});
