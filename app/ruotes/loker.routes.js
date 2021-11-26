module.exports = app => {
    const loker = require("../controllers/loker.controller.js");

    var router = require("express").Router();

    // Create a new sample
    router.post("/", loker.create);

    // Retrieve all samples
    router.get("/", loker.findAll);

    // Retrieve a single sample with id
    router.get("/:id", loker.findOne);

    // Update a sample with id
    router.put("/:id", loker.update);

    // Delete a sample with id
    router.delete("/:id", loker.delete);

    // Delete all samples
    router.delete("/", loker.deleteAll);

    app.use("/api/loker", router);
}