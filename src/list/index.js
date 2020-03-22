const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const models = require("../../db/models");

app.use(express.json());
// url:for parsing application/xwww-form-urlencoded
app.use(express.urlencoded());
//body:for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//查询任务列表
app.get("/list/:status/:page", async (req, res) => {
  let { status, page } = req.params;
  let limit = 10;
  let offset = (page - 1) * limit;
  let where = {};
  if (status != -1) {
    where.status = status;
  }
  //1.状态 1：表示待办，2：完成，3：删除，-1：全部
  //2.分页处理
  let list = await models.Todo.findAndCountAll({
    where: where,
    limit,
    offset
  });
  res.json({
    list,
    message: "列表查询成功"
  });
});
/**创建一个todo */
app.post("/create", async (req, res, next) => {
  try {
    let { name, deadline, content } = req.body; //需要引入body-parser
    // /**数据持久化到数据库 */ Todo是模型
    let todo = await models.Todo.create({
      name,
      deadline,
      content
    });
    res.json({
      todo,
      message: "创建成功！"
    });
  } catch (error) {
    next(error); //进入全局异常处理
  }
});
/**修改一个todo */
app.post("/update", async (req, res, next) => {
  try {
    let { name, deadline, content, id } = req.body;
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    });
    if (todo) {
      //执行更新数据功能
      todo = await todo.update({
        name,
        deadline,
        content
      });
    }
    res.json({
      // todo: { name, deadline, content, id }
      todo: todo,
      message: "更新成功"
    });
  } catch (error) {
    next(error);
  }
});
/**修改一个todo,删除 */
app.post("/update_status", async (req, res, next) => {
  try {
    let { id, status } = req.body;
    let todo = await models.Todo.findOne({
      where: {
        id
      }
    });
    if (todo && status != todo.status) {
      todo = await todo.update({
        status
      });
    }
    res.json({
      todo,
      message: "更新任务"
    });
  } catch (error) {
    next(error);
  }
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
