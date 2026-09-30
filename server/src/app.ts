import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());

const PORT = 3000;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Server running on port ${3000}`);
    
})