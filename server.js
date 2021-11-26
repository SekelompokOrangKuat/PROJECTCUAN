const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("[INFO] Connected to the database!");
    })
    .catch(err => {
        console.log("[INFO] Cannot connect to the database!", err);
        process.exit();
    });


app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to my first project." });
});

require("./app/ruotes/sample.routes")(app);
require("./app/ruotes/admin.routes")(app);
require("./app/ruotes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`[INFO] Server is running on port ${PORT}.`);
});