const mongoose = require("mongoose");

const transeDataSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  utcTime: {
    type: Date,
    required: true,
  },

  operation: {
    type: String,
    required: true,
  },

  baseCoin: {
    type: String,
    required: true,
  },

  quoteCoin: {
    type: String,
    required: true,
  },
  
  amount: {
    type: Number,
    required: true,
  },
  
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("transectionData", transeDataSchema);
