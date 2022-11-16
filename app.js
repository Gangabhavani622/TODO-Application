const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "cricketMatchDetails.db");
const app = express();
app.use(express.json());

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

//GET API 1
app.get("/todos/", async (request, response) => {
  const { offset, limit, order, order_by, status = "TO%20DO" } = request.query;
  const getTodoQuery = `SELECT * FROM todo WHERE status="TO DO";`;
  const dbResponse = await db.run(getTodoQuery);
  console.log(dbResponse);
  response.send(dbResponse);
});

module.exports = app;
