import * as UserModel from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const existing = await UserModel.findByEmail(email);

        if (existing.length > 0) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const userId = await UserModel.createUser(email, password);

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            userId: userId,
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password required" });
        }

        const user = await UserModel.findByEmail(email);

        if (user.length === 0) {
            return res.status(400).json({ message: "Invalid email" });
        }

        const validPassword = bcrypt.compareSync(password, user[0].password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user[0].id },
            process.env.SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            success: true,
            token: token
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
