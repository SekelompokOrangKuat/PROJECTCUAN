const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.samples = require("./sample.model.js")(mongoose);
db.admins = require("./admin.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
<<<<<<< HEAD
db.role = require("./role.model.js")(mongoose);
=======
db.lokers = require("./loker.model.js")(mongoose);
>>>>>>> a4441fcc1b4dd2ebdeebc977ddf7237de24ed3f2

db.ROLES = ["user", "admin", "mahasiswa", "dosen"];
module.exports = db;