const { Schema, model } = require('mongoose');
// const  Game  = require('./Game');
const dateFormat = require('../utils/dateFormat');

const storeSchema = new Schema(
  {
    storeName: {
      type: String,
      // required: 'You need to leave a store name!',
      minlength: 1,
      maxlength: 80
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      // required: true
    },
    // games: [Game.schema] 
    games: [{ type: Schema.Types.ObjectId, ref: 'Game' }]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

// storeSchema.virtual('Game').get(function() {
//   return this.games.find([ Game ]);
// });

const Store = model('Store', storeSchema);

module.exports =  Store ;
