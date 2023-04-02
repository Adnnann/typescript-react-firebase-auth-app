import isEmail from "validator/lib/isEmail";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import mongoose, { Model, Schema, model } from "mongoose";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  hashedPassword: string;
  salt: string;
}
interface IUserMethods {
  generateAuthToken: (user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  }) => any;
  create: (user: IUser) => any;
  findByCredentials: (email: string, password: string) => any;
  findById: (id: string) => any;
  findOne: ({ email, password }: { email: string; password: string }) => any;
  makeSalt: () => string;
  encryptPassword: (password: string) => string;
  authenticate: (plainText: string) => boolean;
}

type UserModel = Model<IUser, {}, IUserMethods>;

interface Env {
  JWT_SECRET: string;
}

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: [isEmail, "Invalid email address"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  salt: String,
});

UserSchema.virtual("password").set(function (this: any, password) {
  (this._password = password),
    (this.salt = this.makeSalt()),
    (this.hashedPassword = this.encryptPassword(password));
});

UserSchema.methods.authenticate = function (plainText: string) {
  return this.encryptPassword(plainText) === this.hashedPassword;
};
UserSchema.methods.encryptPassword = function (password: string) {
  if (!password) return "";
  try {
    return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
  } catch (err: any) {
    return err;
  }
};
UserSchema.methods.makeSalt = function () {
  return Math.round(new Date().valueOf() * Math.random()) + "";
};
UserSchema.methods.generateAuthToken = function (user: {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}) {
  const { _id, firstName, lastName, email } = user;

  const key = process.env.JET_SECRET || "secret";

  const token = jwt.sign(
    {
      id: _id,
      email: email,
      firstName: firstName,
      lastName: lastName,
    },
    key
  );
  return token;
};

UserSchema.path("email").validate(async function (this: any, email: string) {
  const user = await this.constructor.findOne({ email });

  if (user) {
    if (this.id === user.id) {
      return true; // allow to save same email
    }
    return false;
  }
  return true;
}, "Email already exists!");

mongoose.set("strictQuery", true);
const User = mongoose.model<IUser, IUserMethods>("User", UserSchema);

export default User;
