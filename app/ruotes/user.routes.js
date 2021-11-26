module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const { authJwt } = require("../middlewares");
    var router = require("express").Router();

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.get("/test/all", user.allAccess);

    router.get("/test/user", [authJwt.verifyToken], user.userBoard);

    router.get(
        "/test/admin", [authJwt.verifyToken, authJwt.isAdmin],
        user.adminBoard
    );

    // Create a new sample
    router.post("/", user.create);

    // Retrieve all samples
    router.get("/", user.findAll);

    // Retrieve a single sample with id
    router.get("/:id", user.findOne);

    // Update a sample with id
    router.put("/:id", user.update);

    // Delete a sample with id
    router.delete("/:id", user.delete);

    // Delete all samples
    router.delete("/", user.deleteAll);

    app.use("/api/user", router);

}