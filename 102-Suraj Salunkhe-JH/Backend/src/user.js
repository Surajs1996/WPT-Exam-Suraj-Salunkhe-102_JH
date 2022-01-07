const mysql = require("mysql");

const Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

const dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "exam",
};

async function Checkconnection() {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  console.log("Connection Created ");
  await connection.endAsync();
}

let Message = async (msg) => {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  let sql = `insert into Messages (message) values (?)`;
  await connection.queryAsync(sql, [msg.message]);
  console.log("Data Added");
  await connection.endAsync();
};

let ShowMessage = async () => {
  const connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  let sql = `select * from Messages  ordered by desc`;
  const list = await connection.queryAsync(sql, []);
  await connection.endAsync();
  console.log("Data Showed");
  return list;
};
Checkconnection();

module.exports = { Message, ShowMessage };
