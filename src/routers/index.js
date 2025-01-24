const category = require("./category");
const user = require("./user");
const setting = require("./setting");
const monthlySummary = require("./monthlySummary");
const transaction = require("./transaction");

function route(app) {
  // app.use("/api/vocabulary", vocabulary);
  app.use("/api/category", category);
  app.use("/api/user", user);
  app.use("/api/setting", setting);
  app.use("/api/monthly-summary", monthlySummary);
  app.use("/api/transaction", transaction);
}

module.exports = route;
