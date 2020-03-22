# proNode

## 数据库初始化

1. 创建一个数据库
2. 使用`sequelize cli`初始化 项目的数据库配置信息
   `mkdir db`
   `cd db`
   `npx sequelize init`
3. 生成模型文件

   1. migrate 文件
   2. model 文件`npx sequelize model:generate --name Todo --attributes name:string,deadline:date,content:string`

4. 持久化，模型对应的[数据库表]
   `npx sequelize db:migrate`
5. 发布和运维
   `npm i pm2 -g`
   `pm2 init`
   `pm2 start ecosystem.config.js` 启动
   `pm2 list` 管理
   `pm2 restart 0` 重启
   `pm2 log` 日志
