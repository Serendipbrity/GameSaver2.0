const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');

const storeSchema = new Schema(
  {
    storeName: {
      type: String,
      // required: 'You need to leave a store name!',
      minlength: 1,
      maxlength: 280
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
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

storeSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Store = model('Store', storeSchema);

module.exports = Store;
