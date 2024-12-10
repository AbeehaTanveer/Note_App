const express = require("express");
const cors = require("cors");
const { Database } = require("./Database/database");
const dotenv = require('dotenv');

const userRoute = require("./Routes/userRoute");
const { noteRoute } = require("./Routes/noteRoute");

dotenv.config()
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8080;


// Api Route
app.get("/", (req, res) => {
    res.send("You are on the correct PORT");
    console.log("Hello World");
  });

//   UserRoute

app.use("/",userRoute)

// NoteRoute

app.use("/note",noteRoute)




const startServer = async () => {
    try {
       Database();
      app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`);
      });
    } catch (error) {
      console.error("Error starting the server:", error);
    }
  };
  
  startServer();
  

