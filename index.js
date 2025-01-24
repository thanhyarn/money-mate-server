const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./src/routers");
const db = require("./src/config/dbConfig");
db.connect();

const app = express();
app.use(cors());
app.use(bodyParser.json());

route(app);

const PORT = 3003;

app.listen(PORT, () => console.log(`HTTP server listening on port ${PORT}`));
