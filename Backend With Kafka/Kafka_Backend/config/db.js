
// module.exports = {
//   HOST: "localhost",
//   USER: "root",
//   PASSWORD: "Svk@78784578",
//   DB: "try",
//   dialect: "mysql",
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };



// module.exports = {
//     HOST: "localhost",
//     USER: "root",
//     PASSWORD: "Svk@78784578",
//     DB: "uber_eats"
//   };


  //Mongo DB connection

  const mongoose = require("mongoose");
  const connectDB = async () =>{
    const conn = await mongoose.connect("mongodb+srv://svkannawar5:9TwEu6cHFmQoOQ5N@cluster0.m6q04.mongodb.net/ubereats?retryWrites=true&w=majority", {
      useNewURLParser: true,
      useUnifiedTopology : true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  }
  module.exports = connectDB;
