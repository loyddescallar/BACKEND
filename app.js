import express from "express";

// initialize app
const app = express();

const port = 3000;

// middleware
app.use(express.json());

try{
    app.listen(port, () =>{
    console.log('listening to port 3000...');
});

}catch(e){
    console.log(e);
}

app.get('/loyd',async (request, response) =>{
    response.status(200).json({message: "Hello I am Loyd Descallar"});
});