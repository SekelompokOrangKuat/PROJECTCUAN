module.exports = app => {
    const user = require("../controllers/user.controller.js");

    var router = require("express").Router();

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