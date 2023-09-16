import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({ message: "This user already exists!"});
    } 

    const hashedPassword = await bcrypt.hash(password, 15);

    const newUser = new UserModel({username, password: hashedPassword});
    await newUser.save();

    res.json(newUser);
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({ message: "User does not exist."});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.json({ message: "Password is incorrect."});
    }

    const token = jwt.sign({id: user._id}, "secret");
    res.json({token, userID: user._id});
});


export { router as userRouter };