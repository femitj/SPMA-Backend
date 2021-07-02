import userModel from '../model/users';
import User from './user';

export async function seedUsers() {
  try {
    const createMap = User.map((user) => {
      try {
        userModel.create(user);
      } catch (error) {
        console.log('Unable to seed users');
      }
    });
    await Promise.all(createMap);
    console.log('Users inserted successfully');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}
