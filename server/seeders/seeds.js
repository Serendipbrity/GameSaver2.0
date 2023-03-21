// create dummy data for testing

const faker = require('faker');

const db = require('../config/connection');
const { Store, User, Game } = require('../models');

db.once('open', async () => {
  await Store.deleteMany({});
  await User.deleteMany({});
  await Game.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create stores
  let createdStores = [];
  for (let i = 0; i < 50; i += 1) {
    const storeName = faker.company.companyName();

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdStore = await Store.create({ storeName
      , username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { stores: createdStore._id } }
    );

    createdStores.push(createdStore);
  }

    // create games
    let createdGames = [];
    for (let i = 0; i < 100; i += 1) {
      const gameBrand = faker.lorem.word();
      const gameType = faker.lorem.word();
      const machineNumber = faker.random.number();
      const storeId = createdStores[Math.floor(Math.random() * createdStores.length)]._id;
  
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      const { username, _id: userId } = createdUsers.ops[randomUserIndex];
  
      const createdGame = await Game.create({ gameBrand, gameType, machineNumber, storeId
        , username
      });
      
      // update store with games
      const updatedStore = await Store.updateOne(
        { _id: storeId },
        { $push: { games: createdGame._id, gameBrand, gameType } }
      )
      // update users with games
      const updatedUser = await User.updateOne(
        { _id: userId },
        {
          $push: { games: createdGame._id}
          // trying to add games to stores when updating user
          // $push: { storeId: createdGame._id }
        // }, {
        //   $push: { storeId: createdGame._id }
        }
      );
  
      createdGames.push(createdGame);
    }

  // create reactions
  for (let i = 0; i < 100; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomStoreIndex = Math.floor(Math.random() * createdStores.length);
    const { _id: storeId } = createdStores[randomStoreIndex];

    await Store.updateOne(
      { _id: storeId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }

  console.log('all done!');
  process.exit(0);
});
