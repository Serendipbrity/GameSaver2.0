const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const Store = require('./Store');
const dateFormat = require('../utils/dateFormat');

const gameSchema = new Schema(
  {
    gameBrand: {
      type: String,
      // required: true,
    },
    gameType: {
      type: String,
      // required: true
    },
    machineNumber: {
      type: Number,
    },
    reportId: {
      type: Schema.Types.ObjectId,
      ref: 'Report'
    },
    // come back to this later --- currently not returning the store name
    storeName: {
      type: Schema.Types.ObjectId,
      ref: 'Store' 

    },
    storeId: {
      // make storeId the same _id of the store that the game is in
      type: Schema.Types.ObjectId,
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



const Game = model('Game', gameSchema);

module.exports = Game;
