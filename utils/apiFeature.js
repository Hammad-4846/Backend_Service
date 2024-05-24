const csv = require("csv-parser");
const Trade = require("../models/tradeDataModel");
const fs = require("fs");



exports.getDataFromFile = async (filePath) => {
  return new Promise((resolve, reject) => { //Resolving CSV file
    const trades = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        const [baseCoin, quoteCoin] = row["Market"].split("/");//For Extracting baseCoind and QuoteCoin (Defined in instruction)

        const trade = new Trade({
          userId: row["User_ID"],
          utcTime: new Date(row["UTC_Time"]),
          operation: row["Operation"],
          baseCoin: baseCoin,
          quoteCoin: quoteCoin,
          amount: parseFloat(row["Buy/Sell Amount"]),
          price: parseFloat(row["Price"]),
        });
        trades.push(trade);
      })
      .on("end", () => {
        fs.unlinkSync(filePath);//Deleting File From tmp
        resolve(trades);
      })
      .on("error", (e) => {
        reject(e);
      });
  });
};
