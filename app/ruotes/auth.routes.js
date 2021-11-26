// NOTE update!!!
// - Tambahin get all data 
// - Tambahin ROLE!

module.exports = app => {
    const { verifySignUp } = require("../middlewares");
    const controller = require("../controllers/auth.controller");
    var router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post(
        "/signup", [
            verifySignUp.checkDuplicateEmail,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    router.post("/signin", controller.signin);

    app.use("/api/auth", router);
};