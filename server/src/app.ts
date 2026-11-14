import express from "express";
import router from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());

const allowedOrigins = [
    "http://localhost:5173",
     "https://backcountry-journal.vercel.app"
];

app.use(cors({
    origin: allowedOrigins
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