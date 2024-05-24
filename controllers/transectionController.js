const { error, success } = require("../utils/responseWrapper");

const Trade = require("../models/tradeDataModel");
const { getDataFromFile } = require("../utils/apiFeature");

exports.getDataController = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.send(error(404, "Please Provide Transection Data in CSV"));
    }

    const filePath = file.path;

    const trades = await getDataFromFile(filePath);

    const allTransections = await Trade.insertMany(trades);

    res.send(success(201, allTransections));
  } catch (e) {
    res.status(500).send(error(500, e.message));
  }
};

exports.getNetBalanceController = async (req, res) => {
  try {
    const { timestamp } = req.body;

    if (!timestamp) {
      return res.status(400).send("Timestamp is required");
    }

    const queryTime = new Date(timestamp);

    //As all the Transections belongs to same user don't need to find the user
    const trades = await Trade.find({ utcTime: { $lt: queryTime } });
    const balance = {};

    trades.forEach((trade) => {
      const { baseCoin, amount, operation } = trade;

      //Intializing Entry for the BaseCoin
      if (!balance[baseCoin]) {
        balance[baseCoin] = 0;
      }

      
      //Performing operations
      if (operation.toLocaleLowerCase() === "buy") {
        balance[baseCoin] += amount;
      } else if (operation.toLocaleLowerCase() === "sell") {
        balance[baseCoin] -= amount;
      }
    });

    return res.send(success(200, balance));
  } catch (e) {
    return res.send(error(500, e.message));
  }
};
