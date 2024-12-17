import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import session from "express-session";
import dbConnection from "./config/dbConfig.js";
import cors from 'cors';
import bodyParser from "body-parser";

// Import routes
import calendarRoutes from "./routes/calendarRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import shoppingRoutes from "./routes/shoppingRoutes.js";
import invitationRoutes from "./routes/invitationRoutes.js";
import userManagementRoutes from "./routes/userManagementRoutes.js"
import mainRoutes from "./routes/mainRoutes.js";  

dotenv.config();

const PORT = process.env.PORT || 5000;  // Ensure default PORT is set
const app = express();

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'angele',
  resave: false,
  saveUninitialized: true
}));

// CORS configuration
app.use(cors({
  origin: ["http://localhost:8081"],  
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

dbConnection();

// Use routes
app.use('/api/v1/calendar', calendarRoutes);
app.use('/api/v1/tasks', taskRoutes);
app.use('/api/v1/shoppingList', shoppingRoutes);
app.use('/api/v1/invitation', invitationRoutes);
app.use('/api/v1/users', userManagementRoutes);  
app.use('/api/v1/auth', mainRoutes);  


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
