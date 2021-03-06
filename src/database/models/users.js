/* eslint-disable consistent-return */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Firstname field is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Lastname field is required'],
    },
    phoneNumber: {
      type: String,
    },
    address: {
      type: String,
      required: [true, 'Address field is required'],
    },
    imageUrl: {
      type: String,
    },
    email: {
      type: String,
      validate: {
        validator: (v) =>
          /^\w.+@[a-zA-Z_]+?(\.[a-zA-Z]{2,8})(\.[a-zA-Z]{2,8})?$/.test(v),
        message: (props) => `${props.value} is not a valid email address`,
      },
      required: [true, 'Email field is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [4, 'Password cannot be less than four'],
    },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'active', 'inactive'],
    },
    role: String,
    lga: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
);

const SALT_WORK_FACTOR = 10;
// eslint-disable-next-line func-names
UserSchema.pre('save', function (next) {
  const user = this;
  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();
  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // hash the password using our new salt
    bcrypt.hash(user.password, salt, (errr, hash) => {
      if (errr) return next(errr);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return reject(err);
      return resolve(isMatch);
    });
  });
};

UserSchema.methods.hashPassword = function (candidateNewPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) return reject(err);
      // hash the password using our new salt
      bcrypt.hash(candidateNewPassword, salt, (errr, hash) => {
        if (errr) return reject(errr);
        return resolve(hash);
      });
    });
  });
};

UserSchema.pre('findOneAndUpdate', function (next) {
  const { password } = this.getUpdate().$set;
  if (!password) {
    return next();
  }
  try {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    this.getUpdate().$set.password = hash;
    next();
  } catch (error) {
    return next(error);
  }
});

const userModel = mongoose.model('User', UserSchema);

export default userModel;
