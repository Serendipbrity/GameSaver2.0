const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const gameSchema = new Schema(
  {
    gameBrand: {
      type: String,
      required: true,
    },
    gameType: {
      type: String,
      required: true
    },
    machineNumber: {
      type: Number,
    },
    reportId: {
      type: Number,
      ref: 'Report'
    },
    storeId: {
      type: Number,
      ref: 'Store'
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);

const Game = ('Game', gameSchema);

module.exports = {Game};
