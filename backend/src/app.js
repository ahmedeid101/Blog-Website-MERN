require("dotenv").config();
const dbConnect = require("./config/dbConfig");
const express = require("express");
const cors = require('cors');
const xss = require("xss-clean");
const rateLimiting = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");

const authRoutes = require("./Routes/auth.route");
const userRoutes = require('./Routes/user.routes');
const postRoutes = require('./Routes/post.routes');
const commentRoutes = require('./Routes/comment.route');
const categoryRoutes = require('./Routes/category.route');

const notFound = require("./Middlewares/notFound");
const errorHandler = require('./Middlewares/errorHandler');

//database connection
dbConnect();

//Init App
const app = express();

//Middlewares
app.use(cors());
app.use(express.json()); // For JSON bodies
app.use(express.urlencoded({ extended: true })); // For form data
app.use(xss()); //prevent XSS(Cross Site Scripting) attacks
app.use(rateLimiting({
    windowMs: 10 * 60 * 1000,
    max: 100
})); //for requst rate limit
app.use(helmet()); //for Header Security
app.use(hpp()); //prevent http param pollution

//cors policy
app.use(cors({
    origin: "http://localhost:3000"
}));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/categories', categoryRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
}); 

// Handle 404
app.use(notFound);

// Global error handler
app.use(errorHandler);

//runing the server
const port = process.env.PORT || 8000
app.listen(port, () => console.log(`Server Is Running on ${process.env.NODE_ENV} mode on ${port}`))