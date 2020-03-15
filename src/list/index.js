const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());
// url:for parsing application/xwww-form-urlencoded
app.use(express.urlencoded());
//body:for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//查询任务列表
app.get("/list/:status/:page", async (req, res) => {
  res.json({
    list: []
  });
});
/**创建一个todo */
app.post("/create", async (req, res, next) => {
  let { name, deadline, content } = req.body;
  res.json({
    todo: { name }
  });
});
function error_handle(err, req, res, next) {
  if (err) {
    res.status(500).json({
      message: err.message
    });
  } else {
    next();
  }
}
app.use(error_handle);
module.exports = app;
