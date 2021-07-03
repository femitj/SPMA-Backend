import mongoose from 'mongoose';
import { seedUsers } from '../database/seeds/seed';

async function dbConnection() {
  await mongoose
    .connect(`${process.env.MONGODBURL}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then(mongoDBConnected);

  // await disconnectDB();
  // await seedUsers();
  // await seedProperties();
  // await seedCandidates();
  // await seedFamilies();
  mongoose.connection.on('disconnected', mongoDBDisconnected);
  mongoose.connection.on('error', mongoDBError);
}

function mongoDBConnected() {
  console.log('connected to MongoDB');
}

function mongoDBDisconnected() {
  console.log('MongoDB disconnected');
}

function mongoDBError(err) {
  console.error('MongoDB Error', err);
  process.exit(1);
}

async function disconnectDB() {
  await mongoose.connection.db.dropDatabase();
  console.log('DB dropped');
}

export default dbConnection;
