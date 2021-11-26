module.exports = mongoose => {
    // var childSchema = mongoose.Schema({
    //     jurusan: String,
    //     keahlian: [String],
    //     pengalaman: [String]
    // },   {timestamps: true});

    var parentSchema = mongoose.Schema({
        jenis_loker: String,
        type: String,
        judul_loker: String,
        deskripsi_loker: String,
        tgl_berakhir: Date,
        tgl_mengajukan: Date,
        status: Boolean,
        // children: [childSchema]
        requirement: [{jurusan:String, keahlian:[String], pengalaman:[String]}]

    }, { timestamps: true });

    parentSchema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Loker = mongoose.model("Loker", parentSchema);
    return Loker;
};