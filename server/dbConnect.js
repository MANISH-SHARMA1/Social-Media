const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");

module.exports = async () => {
  let mongoUri = process.env.MONGO_URI

  try {
    const connect = await mongoose.connect(mongoUri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
