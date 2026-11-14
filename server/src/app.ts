import express from "express";
import router from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173"
}));

const PORT = process.env.PORT || 3000;

app.use('/api', router);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "Backcountry journal API is runnning"
    })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
})