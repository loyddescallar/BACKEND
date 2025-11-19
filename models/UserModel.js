import pool from '../config/db.js';
import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from "jsonwebtoken";

// CREATE USER
export const createUser = async (email, password) => {
    if (!email || email.trim() === "") {
        throw new Error('Invalid email!');
    }

    if (!validator.isEmail(email)) {
        throw new Error('Invalid email format!');
    }

    // Check if email exists
    const [user] = await pool.query(
        "SELECT * FROM tbl_user WHERE email = ?",
        [email]
    );

    if (user.length > 0) {
        throw new Error('An account with this email already exists!');
    }

    if (!password || password.trim() === "") {
        throw new Error('Invalid password');
    }

    // Password strength check
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password too weak!');
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const [newUser] = await pool.query(
        "INSERT INTO tbl_user(email, password) VALUES(?,?)",
        [email, hashedPassword]
    );

    return newUser.insertId;
};

// LOGIN USER
export const login = async (email, password) => {
    if (!email || !password) {
        throw new Error('Email and Password are required');
    }

    const [user] = await pool.query(
        "SELECT * FROM tbl_user WHERE email = ?",
        [email]
    );

    if (user.length === 0) {
        throw new Error(`An account with this email (${email}) does not exist.`);
    }

    const isMatch = bcrypt.compareSync(password, user[0].password);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    // Generate token
    const token = jwt.sign(
        { id: user[0].id },
        process.env.SECRET,
        { expiresIn: '1d' }
    );

    return token;
};
