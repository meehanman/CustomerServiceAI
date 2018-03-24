var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = new Schema({
  name: { type: String, required: true, lowercase: true},
  email: { type: String, required: true, unique: true, lowercase: true},
  password: { type: String, required: true },
  created_at: Date,
  updated_at: Date
});

customerSchema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    this.updated_at = now;
    next();
});

// the schema is useless so far
// we need to create a model using it
var Customer = mongoose.model('User', customerSchema);

// make this available to our users in our Node applications
module.exports = Customer;