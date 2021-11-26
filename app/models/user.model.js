module.exports = mongoose => {
    var schema = mongoose.Schema({
        nomor_induk: String,
        type: String,
        email: String,
        password: String,
        nama: String,
        tgl_lahir: String,
        alamat: String,
        prodi: String,
        no_tlp: String,
        gender: String,
        status: Boolean
    }, { timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("User", schema);
    return User;
};