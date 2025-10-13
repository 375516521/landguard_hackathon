const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  title: String,
  description: String,
  parcel: { type: Schema.Types.ObjectId, ref: 'Parcel' },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  fundingNeeded: Number,
  fundingRaised: { type: Number, default: 0 },
  status: { type: String, enum: ['open','funded','closed'], default: 'open' },
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Project', projectSchema);





