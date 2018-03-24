var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var complaintSchema = new Schema({
  name: { type: String, required: true, lowercase: true},
  email: { type: String, required: true, unique: true, lowercase: true},
  password: { type: String, required: true }
});

// the schema is useless so far
// we need to create a model using it
var complaint = mongoose.model('complaints', complaintSchema);

// make this available to our users in our Node applications
module.exports = complaint;