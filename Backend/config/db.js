
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
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewURLParser: true,
      useUnifiedTopology : true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`.blue);
  }
  module.exports = connectDB;
