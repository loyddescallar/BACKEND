import * as StudentController from '../controllers/StudentController.js';
import express from "express";

const bookRoutes = express.Router();

bookRoutes.get('/all', StudentController.fetchBooks);


export default bookRoutes;