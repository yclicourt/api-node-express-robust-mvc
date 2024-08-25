const dbConnectNosql = require("./config/mongo");
const { dbConnectMySQl } = require("./config/mysql");
require("dotenv").config();

const app = require("./app");



const port = process.env.PORT || 3000;
const ENGINE_DB = process.env.ENGINE_DB;

app.listen(port, () => {
  ENGINE_DB === "nosql" ? dbConnectNosql() : dbConnectMySQl();

  console.log(`Server listening on port ${port}`);
});
