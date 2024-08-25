const mongoose = require("mongoose");

const dbConnectNosql = async () => {
    try {
        const DB_URI = process.env.DB_URI;
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
