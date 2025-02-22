const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);

const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(
  cors({
    origin: "http://localhost:4200", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent with requests
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Succesfully!");
  })
  .catch((error) => {
    console.log(`${error}`);
  });

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: "mySessions",
});

app.use(
  session({
    secret: "This is secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    },
  })
);

//routes
app.use("/betacode", authRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
