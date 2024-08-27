const mongoose = require("mongoose");
require("dotenv").config();

const dbConnectNosql = async () => {
    try {
        const DB_URI = process.env.DB_URI || "mongodb://mongo-service:27017/backend_node_api";
        await mongoose.connect(
          DB_URI,
          {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        console.log("*** CONEXION CORRECTA *** ");
    } catch (error) {
        console.log("*** ERROR DE CONEXION *** ",error);
    }
};

module.exports = dbConnectNosql;
