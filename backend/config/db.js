const mongoose = require('mongoose');
const mongo_url = process.env.MONGO_URL || '';

const connectToDb = async () => {
  try{
    await mongoose.connect(mongo_url);
    console.log(`Successfully connected to mongodb.`)
  }
  catch(e){
    console.error(`Error connecting to mongodb: ${e}`);
  }
}

module.exports = connectToDb;