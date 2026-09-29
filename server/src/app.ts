import { log } from "console";
import express from "express";

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send("Hey you made it ;)")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${3000}`);
    
})