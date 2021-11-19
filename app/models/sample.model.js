// const { SchemaTypes, Schema } = require("mongoose");

// module.exports = mongoose => {
//     var schema = mongoose.Schema(
//         "Sample",
//         mongoose.Schema(
//             {
//                 title: String,
//                 description: String,
//                 published: Boolean
//             },
//             { timestamps: true }
//         )
//     );

//     schema.method("toJSON", function() {
//         const {__v, _id, ...object } = this.toOject();
//         object.id = _id;
//         return object;
//     });

//     Sample = mongoose.model("sample", schema);
//     return Sample;
// };

module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        published: Boolean
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Sample = mongoose.model("sample", schema);
    return Sample;
  };