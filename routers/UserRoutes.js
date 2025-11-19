import * as UserController from '../controllers/UserController.js';
import express from "express";

const UserRoutes = express.Router();

// REGISTER
UserRoutes.post('/new', UserController.createUser);

// LOGIN
UserRoutes.post('/login', UserController.login);

export default UserRoutes;
