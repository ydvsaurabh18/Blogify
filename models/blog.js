const mongoose = require('mongoose');
const { Schema } = mongoose;

 const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
     },
      body: {
        type: String,
        required: true,
    },
    coverImageURL: {
        type: String,
        required: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId, //user ki mogodb id store krega
        ref: "user",
    },
},
    { timestamps: true }
 );

 const Blog = mongoose.model('blog', blogSchema);
  module.exports = Blog;