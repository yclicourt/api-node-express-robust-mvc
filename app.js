const express = require("express");
const cors = require("cors");

const app = express();

//const loggerStream = require("./utils/handleLogger");
//const morganBody = require("morgan-body")


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

/**
 * Aqui invocamos a las rutas
 * */
//TODO localhost/api/______
app.use("/api/v1", require("./routes"));

module.exports = app;
