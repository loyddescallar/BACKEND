import express from "express";
import 'dotenv/config.js';
import bookRoutes from "./routers/StudentRoutes.js";

// initialize app
const app = express();

const port = 3000;

// middleware
app.use(express.json());

try{
    app.listen(process.env.PORT || 3000, () =>{
        console.log('Listening to port ${process.env.PORT || 3000}...')
    })
} catch(e){
    console.log(e)
}

app.use('/tbl_student',bookRoutes);