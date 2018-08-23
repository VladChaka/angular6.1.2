const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      TakenBookSchema = new Schema({
          userid: {
              type: String,
              required: true,
              unique: true
          },
          books: [{
              bookid: String,
              dateReceived: String
          }]
      }),
      TakenBookSchemaModel = mongoose.model("Takenbooks", TakenBookSchema);

module.exports = { TakenBookSchema: TakenBookSchema, TakenBookSchemaModel: TakenBookSchemaModel };