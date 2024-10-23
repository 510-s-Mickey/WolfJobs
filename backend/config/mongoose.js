const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
mongoose.set("strictQuery", true);

let mongod;

/**
 * if the NODE_ENV is set == "test" (which if you run npm test in the backend tests, that's the default),
 * it will use a in-memory mongodb server that will start up with the tests and be destroyed after. Will not affect
 * production.
 *
 * If started the normal way, will use the standard mongodb database
 */
const connectDB = async () => {
  if (process.env.NODE_ENV === "test") {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } else { //"mongodb://localhost:27017/wolfjobs_development"
    const connectWithRetry = async () => {

      mongoose.connect('mongodb://db:27017/wolfjobs_development', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(() => {
        console.log('MongoDB connected successfully');
      }).catch(err => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.', err);
        setTimeout(connectWithRetry, 5000);
      });
    };
    connectWithRetry();    
  }
};
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to mongodb"));

db.once("open", function () {
  console.log("Connected to database :: MongoDB");
});

module.exports = { connectDB, db };
