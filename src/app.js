const express = require("express");
require('dotenv').config();
const cors = require("cors");
const userRouters = require("./routes/users");
const app = express();

const corsOptions = {
    origin: "http://localhost:8081"
  };  
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use('/api/users', userRouters);


const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if(err) throw err;
    console.log(`Server is running on http://localhost:${port}`);
});