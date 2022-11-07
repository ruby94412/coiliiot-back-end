const sprintf = require("sprintf-js").sprintf;
const MongoClient = require('mongodb').MongoClient;
const host1 = process.env.dbHost1;
const port1 = process.env.dbPort1;
const host2 = process.env.dbHost2;
const port2 = process.env.dbPort2;
const username = process.env.dbUsername;
const password = process.env.dbPassword;
const replSetName = process.env.dbReplSetName;
const demoDb = "test";
const demoColl = "testColl";
// 官方建议使用副本集地址，确保高可用。
const url = sprintf("mongodb://%s:%s@%s:%d,%s:%d/admin?replicaSet=%s",
        username, password, host1, port1, host2, port2, replSetName);
console.info("url:", url);
const client = new MongoClient(url);
// 获取mongoClient。
async function run() {
    try {
        // 连接实例。
        await client.connect();
        // 取得数据库句柄。
        const database = client.db(demoDb);
        // 取得Collection句柄。
        const collection = database.collection(demoColl);
        const demoName = "Node For Demo";
        const doc = { "DEMO": demoName, "MESG": "Hello AliCoudDB For MongoDB" };
        console.info("ready insert document: ", doc);
        // 插入数据。
        const result = await collection.insertOne(doc);
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`,
        );
        // 读取数据。
        const filter = { "DEMO": demoName };
        const findResult = await collection.find(filter);
        await findResult.forEach(console.dir);
      } finally {
          // 关闭连接。
          await client.close();
      }
}

module.exports = {
    run,
}