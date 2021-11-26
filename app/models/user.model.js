module.exports = mongoose => {
    var schema = mongoose.Schema({
        nomor_induk: String,
        roles: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role"
        }],
        email: String,
        password: String,
        nama: String,
        tgl_lahir: String,
        alamat: String,
        prodi: String,
        no_tlp: String,
        gender: String
    }, { timestamps: true });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const User = mongoose.model("User", schema);
    return User;
};