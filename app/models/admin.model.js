module.exports = mongoose => {
    var schema = mongoose.Schema({
        email: String,
        password: String,
        nama: String,
        alamat: String,
        no_tlp: String
    }, { timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Admin = mongoose.model("Admin", schema);
    return Admin;
};