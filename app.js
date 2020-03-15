const express = require("express");
const app = express();
const listRouter = require("./src/list/index");
app.use(listRouter);
app.listen(5000, () => {
  console.log("启动服务");
});
