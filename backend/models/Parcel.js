const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const analysisSchema = new Schema({
  date: { type: Date, default: Date.now },
  riskScore: Number,
  degradationTypes: [String],
  raw: Schema.Types.Mixed
}, { _id: false });

const parcelSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, required: true },
  description: String,
  geojson: { type: Object, required: true },
  country: String,
  areaHectares: Number,
  riskScore: { type: Number, default: 0 },
  degradationTypes: [String],
  analysisHistory: [analysisSchema],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Parcel', parcelSchema);



