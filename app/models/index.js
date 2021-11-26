const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.samples = require("./sample.model.js")(mongoose);
db.admins = require("./admin.model.js")(mongoose);
db.users = require("./user.model.js")(mongoose);
db.role = require("./role.model.js")(mongoose);

db.ROLES = ["user", "admin", "mahasiswa", "dosen"];
module.exports = db;