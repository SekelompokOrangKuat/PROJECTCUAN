const db = require("../models");
const Admin = db.admins;

// Create and save a new admin
exports.create = (req, res) => {
    // Validate request
    if (!req.body.email) {
        res.status(400).send({ message: "Email can not be empty!" });
        return;
    }

    // Create a admin
    const admin = new Admin({
        email: req.body.email,
        password: req.body.password,
        nama: req.body.nama,
        alamat: req.body.alamat,
        no_tlp: req.body.no_tlp
    });

    // Save admin in the database
    admin
        .save(admin)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating Admin."
            });
        });
};

// Retrieve all admin from the database.
exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

    Admin.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred whild retrieving admin."
            });
        });
};

// Find a single sample with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Admin.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found admin with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving admin with id=" + id });
        });
};

// Update a sample by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Admin.findByIdAndUpdate(id, req.body, { useFindAndMody: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update admin with id=${id}. Maybe admin was not found.`
                });
            } else res.send({ message: "admin was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating admin with id=" + id
            });
        });
};

// Delete a sample with the specified id in teh request
exports.delete = (req, res) => {
    const id = req.params.id;

    Admin.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete admin with id=${id}. Maybe admin was not found!`
                });
            } else {
                res.send({
                    message: "admin was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete admin with id=" + id
            });
        });
};

// Delete all samples from the database.
exports.deleteAll = (req, res) => {
    Admin.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} admins were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all admin."
            });
        });
};