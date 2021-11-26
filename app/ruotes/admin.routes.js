module.exports = app => {
    const admin = require("../controllers/admin.controller.js");

    var router = require("express").Router();

    // Create a new sample
    router.post("/", admin.create);

    // Retrieve all samples
    router.get("/", admin.findAll);

    // Retrieve a single sample with id
    router.get("/:id", admin.findOne);

    // Update a sample with id
    router.put("/:id", admin.update);

    // Delete a sample with id
    router.delete("/:id", admin.delete);

    // Delete all samples
    router.delete("/", admin.deleteAll);

    app.use("/api/admin", router);
}