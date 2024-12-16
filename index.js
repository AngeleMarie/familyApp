import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import session from "express-session";
import dbConnection from "./config/dbConfig.js";
import cors from 'cors'
import bodyParser from "body-parser";
import calendarRoutes from "./routes/calendarRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import shoppingRoutes from "./routes/shoppingRoutes.js"




dotenv.config();

const PORT = process.env.PORT
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

app.use(session({
  secret: process.env.SESSION_SECRET || 'angele',
  resave: false,
  saveUninitialized: true
}));
app.use(cors({
  origin: [ "http://localhost:3000"],  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));




dbConnection();

app.use('/api/v1/calendar', calendarRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/shoppingList', shoppingRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
