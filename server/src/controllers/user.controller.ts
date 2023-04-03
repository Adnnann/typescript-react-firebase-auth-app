import { Request, Response } from "express";
import User from "../models/user.model";
import errorHandler from "./helpers/errorHandler";

export interface UserRequest extends Request {
  user: {
    _id: string;
  };
}

const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken(user);
    console.log(token);
    res.status(200).json(token);
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: errorHandler.getErrorMessage(error) });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.authenticate(password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = await user.generateAuthToken(user);
    res.status(200).json({ user, token });
  } catch (error: any) {
    res.status(400).json({ error: errorHandler.getErrorMessage(error) });
  }
};

const getUser = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({ user });
  } catch (error: any) {
    res.status(400).json({ error: errorHandler.getErrorMessage(error) });
  }
};

export default { registerUser, loginUser, getUser };
