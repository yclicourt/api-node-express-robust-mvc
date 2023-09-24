const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const dbConnectNosql = require("./config/mongo");
const { dbConnectMySQl} = require("./config/mysql");

//const loggerStream = require("./utils/handleLogger");
//const morganBody = require("morgan-body")




const ENGINE_DB = process.env.ENGINE_DB;
app.use(cors());
app.use(express.json());
app.use(express.static("storage"));

/**
 * Este metodo es para verificar los errores y añadirlos a un bot ya sea de telegram o slack
 */
/* 
morganBody(app,{
  noColors:true,
  stream:loggerStream,
  skip:function(req,res){
    return res.statusCode < 400
  }
}) */
const port = process.env.PORT || 3000;

/**
 * Aqui invocamos a las rutas
 * */
//TODO localhost/api/______
app.use("/api", require("./routes"));

app.listen(port, () => {

  ENGINE_DB === "nosql" ? dbConnectNosql() : dbConnectMySQl()


  console.log(`http://localhost:${port}`);
});
