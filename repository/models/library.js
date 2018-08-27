
const mongoose   = require('mongoose'),
      Schema     = mongoose.Schema,
      BookSchema = new Schema({
          bookname: {
              type: String,
              unique: true,
              required: true
          },
          count: {
              type: Number,
              required: true
          },
          description: {
              type: String,
              required: true
          },
          author: {
              type: String,
              required: true
          },
          released: {
              type: String,
              required: true
          },
          photo: {
              type: String,
              required: true
          },
          rating: {
              type: String,
              required: true
          }
      }),
      BookSchemaModel = mongoose.model("Books", BookSchema);

module.exports = { BookSchema: BookSchema, BookSchemaModel: BookSchemaModel };