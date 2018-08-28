const mongoose           = require('mongoose'),
      Schema             = mongoose.Schema,
      ReturnedBookSchema = new Schema({
          userid: {
              type: String,
              required: true
          },
          books: [{
              bookid: String,
              dateReceiving: String,
              dateReturned: String
          }]
      }),
      ReturnedBookSchemaModel = mongoose.model("ReturnedBooks", ReturnedBookSchema);

module.exports = { ReturnedBookSchema: ReturnedBookSchema, ReturnedBookSchemaModel: ReturnedBookSchemaModel };