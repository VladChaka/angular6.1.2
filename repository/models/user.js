
const mongoose   = require('mongoose'),
      Schema     = mongoose.Schema,
      UserSchema = new Schema({
          username: {
              type: String,
              unique: true,
              required: true
          },
          email: {
              type: String,
              unique: true,
              required: true
          },
          post: {
              type: String
          },
          phone: {
              type: String,
              required: true
          },
          password: {
              type: String,
              required: true
          },
          fullname: {
              type: String,
              required: true
          },
          rating: {
              type: Number,
              required: true
          },
          regDate: {
              type: String,
              required: true
          },
          photo: {
              type: String,
              required: true
          }
      }),
      UserSchemaModel = mongoose.model("Users", UserSchema);

module.exports = { UserSchema: UserSchema, UserSchemaModel: UserSchemaModel };