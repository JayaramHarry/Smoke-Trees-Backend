// models/Address.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
  address: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    required: true
  }
});

module.exports = mongoose.model('Address', addressSchema, 'useraddressdb'); // 'useraddressdb' is the collection name
