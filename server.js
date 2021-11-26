const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("./app/models");
const Role = db.role;

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("[INFO] Connected to the database!");
        initial();
    })
    .catch(err => {
        console.log("[INFO] Cannot connect to the database!", err);
        process.exit();
    });

// parse requests of content-type - application/json
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
<<<<<<< HEAD
require("./app/ruotes/auth.routes")(app);

function initial() {
    Role.estimatedDocumentCount((err, count) => {
        if (!err && count === 0) {
            new Role({
                name: "user"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'user' to roles collection");
            });

            new Role({
                name: "moderator"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'moderator' to roles collection");
            });

            new Role({
                name: "admin"
            }).save(err => {
                if (err) {
                    console.log("error", err);
                }

                console.log("added 'admin' to roles collection");
            });
        }
    });
}

=======
require("./app/ruotes/loker.routes")(app);
>>>>>>> a4441fcc1b4dd2ebdeebc977ddf7237de24ed3f2
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`[INFO] Server is running on port ${PORT}.`);
});