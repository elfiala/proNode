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
  let { name, deadline, content } = req.body; //需要引入body-parser
  res.json({
    todo: { name, deadline, content }
  });
});
/**修改一个todo */
app.post("/update", async (req, res, next) => {
  let { name, deadline, content, id } = req.body;
  res.json({
    todo: { name, deadline, content, id }
  });
});
/**修改一个todo,删除 */
app.post("/update_status", async (req, res, next) => {
  let { id, status } = res.body;
  res.json({
    todo: {},
    id,
    status
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
