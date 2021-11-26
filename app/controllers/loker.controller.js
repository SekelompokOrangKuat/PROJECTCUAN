const db = require("../models");
const Loker = db.lokers;

// Create and save a new loker
exports.create = (req, res) => {
    // Validate request
    if (!req.body.judul_loker) {
        res.status(400).send({ message: "Judul loker can not be empty!" });
        return;
    }

    // Create a loker
    const loker = new Loker({
        jenis_loker: req.body.jenis_loker,
        type: req.body.type,
        judul_loker: req.body.judul_loker,
        deskripsi_loker: req.body.deskripsi_loker,
        tgl_berakhir: req.body.tgl_berakhir,
        tgl_mengajukan: req.body.tgl_mengajukan,
        status: req.body.status,
        requirement: req.body.requirement
    });

    // Save loker in the database
    loker
        .save(loker)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating Loker."
            });
        });
};

// Retrieve all loker from the database.
exports.findAll = (req, res) => {
    const judul_loker = req.query.judul_loker;
    var condition = judul_loker ? { judul_loker: { $regex: new RegExp(judul_loker), $options: "i" } } : {};

    Loker.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred whild retrieving loker."
            });
        });
};

// Find a single sample with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Loker.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found loker with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving loker with id=" + id });
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

    Loker.findByIdAndUpdate(id, req.body, { useFindAndMody: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update loker with id=${id}. Maybe loker was not found.`
                });
            } else res.send({ message: "loker was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating loker with id=" + id
            });
        });
};

// Delete a sample with the specified id in teh request
exports.delete = (req, res) => {
    const id = req.params.id;

    Loker.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete loker with id=${id}. Maybe loker was not found!`
                });
            } else {
                res.send({
                    message: "loker was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete loker with id=" + id
            });
        });
};

// Delete all samples from the database.
exports.deleteAll = (req, res) => {
    Loker.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} lokers were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all loker."
            });
        });
};